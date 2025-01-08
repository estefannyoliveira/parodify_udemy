// @ts-check
const { test, expect } = require("@playwright/test");
const { title } = require("process");

test("Deve dar play em musica", async ({ page }) => {
  const musica = {
    id: 1,
    title: "Teste",
    artist: "Nullvana",
    description: "Nullvana",
    image: "https://raw.githubusercontent.com/qaxperience/mock/main/covers/nevertesting.jpg",
    type: "album",
    src: "https://raw.githubusercontent.com/qaxperience/mock/main/songs/nirvana.mp3"
  };

   await page.route('**/songs', route => route.fulfill({
    status:200,
    body: JSON.stringify([musica])
   })
  )
  await page.goto("/");

   const usuarioLogado = page.locator(".logged-user");
   await expect(usuarioLogado).toHaveText('Fernando Papito');

  const cardMusica = page.locator(".song").filter({ hasText: musica.title });
  const play = cardMusica.locator(".play");
  const pause = cardMusica.locator(".pause");

  await play.click();
  await expect(pause).toBeVisible({ timeout: 2000 });
  await expect(play).toBeVisible({ timeout: 7000 });

  // await page.click(`//div[contains(@class, "song")]//h6[text() = "${musica.title}"]/..//button`);
   // await page.waitForTimeout(5000);
});
