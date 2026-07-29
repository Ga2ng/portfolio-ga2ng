import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username") || "Ga2ng";
  const yearStr = searchParams.get("year") || "2026";
  const year = parseInt(yearStr, 10);
  const token = process.env.GITHUB_TOKEN;

  // 1. If GITHUB_TOKEN is configured in environment, use official GraphQL API for private+public data
  if (token) {
    try {
      const fromDate = `${year}-01-01T00:00:00Z`;
      const toDate = `${year}-12-31T23:59:59Z`;

      const query = `
        query($username: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $username) {
            contributionsCollection(from: $from, to: $to) {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                    contributionLevel
                  }
                }
              }
            }
          }
        }
      `;

      const gqlRes = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: { username, from: fromDate, to: toDate },
        }),
      });

      if (gqlRes.ok) {
        const gqlData = await gqlRes.json();
        const calendar = gqlData?.data?.user?.contributionsCollection?.contributionCalendar;
        if (calendar) {
          const days: { date: string; level: number; count: number }[] = [];
          calendar.weeks.forEach((w: any) => {
            w.contributionDays.forEach((d: any) => {
              let levelNum = 0;
              if (d.contributionLevel === "FIRST_QUARTILE") levelNum = 1;
              if (d.contributionLevel === "SECOND_QUARTILE") levelNum = 2;
              if (d.contributionLevel === "THIRD_QUARTILE") levelNum = 3;
              if (d.contributionLevel === "FOURTH_QUARTILE") levelNum = 4;

              days.push({
                date: d.date,
                level: levelNum,
                count: d.contributionCount,
              });
            });
          });

          return NextResponse.json({
            username,
            year,
            totalContributions: calendar.totalContributions,
            days,
          });
        }
      }
    } catch (e) {
      console.error("GraphQL API error:", e);
    }
  }

  // 2. Fetch authentic HTML contributions from github.com/users/username/contributions
  try {
    const fromDate = `${year}-01-01`;
    const toDate = `${year}-12-31`;
    const url = `https://github.com/users/${username}/contributions?from=${fromDate}&to=${toDate}`;

    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html",
      },
      next: { revalidate: 3600 },
    });

    let totalContributions = 0;
    const days: { date: string; level: number; count: number }[] = [];

    if (res.ok) {
      const html = await res.text();

      // Parse exact total contributions
      const totalMatch = html.match(/([\d,]+)\s+contributions/i);
      if (totalMatch) {
        totalContributions = parseInt(totalMatch[1].replace(/,/g, ""), 10);
      }

      // Parse exact day cells from GitHub's DOM
      const dayRegex = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d+)"/g;
      let dayMatch;
      while ((dayMatch = dayRegex.exec(html)) !== null) {
        const date = dayMatch[1];
        const level = parseInt(dayMatch[2], 10);
        days.push({
          date,
          level,
          count: level === 0 ? 0 : level * 2,
        });
      }
    }

    return NextResponse.json({
      username,
      year,
      totalContributions,
      days,
    });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      {
        username,
        year,
        totalContributions: 0,
        days: [],
      },
      { status: 500 }
    );
  }
}
