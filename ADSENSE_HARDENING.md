# AdSense hardening pass

Completed 2 September 2026, in response to a "your site isn't ready to show ads" rejection on `tallenough.x4iiiis.com`.

## Changes made

- Replaced every old GitHub Pages canonical, Open Graph, structured-data, sitemap and robots URL (`x4iiiis.github.io/RideHeightChecker`) with the live custom domain, `https://tallenough.x4iiiis.com`.
- Corrected the Typhoon Lagoon and Blizzard Beach result headings, which incorrectly named Disney's Animal Kingdom.
- Removed the copy-pasted Tomorrowland Speedway commentary from Universal Studios Florida, Islands of Adventure and Epic Universe (a Magic Kingdom ride description that had been carried into three unrelated Universal pages).
- Corrected the Busch Gardens Tampa Bay editorial paragraph, which referenced SeaWorld Orlando's Infinity Falls, Penguin Trek and Pipeline — same class of copy-paste bug as above, on a fourth page.
- Replaced the supporting copy on all 17 park pages with park-specific planning content, grounded in numbers computed from the maintained ride dataset (lowest/highest threshold, how many rides need no height at all, the supervising-companion pattern, kids'-area maximum heights, and known upcoming closures such as Kumba's retirement at Busch Gardens).
- Expanded the About and Data Sources pages to explain the tool, its methodology, how it's maintained, and — on Data Sources — link to the actual official operator page checked for each resort.
- Updated the Privacy and Cookie policies to describe the site's actual AdSense configuration rather than a future "may enable" state, and implemented a real consent banner (not just policy text) that defaults every visitor to non-personalised ads until they actively opt in.
- Removed the manual ad-slot `<ins>` units, which all carried the invalid placeholder `REPLACE_WITH_YOUR_AD_SLOT_ID`. The AdSense publisher script remains on every checker page for site verification and Auto ads.
- Added `scripts/check_regressions.mjs` to `npm run build`, so a rebuild fails loudly if any of the above regresses — it checks results headings against `data/rides.js`'s park names and checks editorial copy against the ride dataset for cross-park contamination, rather than assuming the bug patterns fixed here are the only ones that could recur.
- Added the four legal/info pages (About, Privacy, Cookies, Data Sources) to `sitemap.xml`, and gave Data Sources and Cookies full page chrome (header, footer, canonical tag) — both previously had none.

## Before requesting another review

1. Deploy this version and confirm the custom domain serves it.
2. View page source on a couple of pages and confirm the canonical tag begins `https://tallenough.x4iiiis.com`.
3. Submit `https://tallenough.x4iiiis.com/sitemap.xml` in Google Search Console if you haven't already, and request re-indexing of the homepage so Google recrawls the corrected canonical URLs before you resubmit.
4. Run `npm run build` once locally — `check_regressions.mjs` should print "clean"; if it doesn't, fix what it flags before deploying.
5. Decide whether you want Auto ads (current setup — Google places ads automatically) or manual ad units in specific positions; if the latter, add real ad unit IDs from your AdSense dashboard back into `<ins class="adsbygoogle">` slots.
6. If you want full EEA/UK consent compliance rather than the lightweight banner shipped here, register a Google-certified consent management platform (e.g. Google's Funding Choices) through your AdSense/Ad Manager account — that's an account-level setup, not something the codebase alone can provide.
7. Don't request another review until Google has had a chance to recrawl the corrected pages.
