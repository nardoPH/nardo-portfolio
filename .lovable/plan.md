# Portfolio Upgrade Plan

This is a large scope (~15 features). I'll split it into 4 phases so we can ship and verify each, instead of one massive change that's hard to debug. Tell me which phase to start with, or "all" to go in order.

---

## Phase 1 — Quick Fixes & Polish (fast wins)

1. **Runtime error**: Fix `TechStack is not defined` on `/admin` (missing import).
2. **Tech stack icons**: Force light/colored icons so they're visible on dark background; ensure works in light mode too.
3. **AI Assistant**:
   - Inject current date (Nov 2026) into system prompt so it never says 2024.
   - Replace bot icon with your logo from the GitHub repo (`n-logo.png`).
4. **Buttons**: Audit all CTAs — add hover states (scale, color, shadow) and smooth transitions across Header, Footer, Hero, Cards.
5. **Home "A quick look at my work"**: Make horizontally scrollable on mobile (snap scroll).
6. **Projects modal**: Show title, description, all images, tags — debug why fields are blank (likely empty DB rows).

---

## Phase 2 — Content & UX Features

7. **Mini journey on Home** + **full timeline on About** using the 4 eras you described (2019–2021, 2021–2023, 2023–2024, 2024–Present) with skill chips.
8. **Contact form rebuild**: 
   - Multi-select "I'm interested in" services chips (UI/UX, QA, Graphic, Video, etc.)
   - Name + Email + Message + Send (stores in DB, emails you via Lovable email).
9. **Client rating modal** (public): name, star rating, comment, optional avatar upload → stored as "pending" review, requires admin approval before showing.
10. **Review name masking**: "Lenhard Pedro" → "L*****d P***o" automatically on display.
11. **Realtime profile views counter** on Home (Supabase realtime + page_views table).

---

## Phase 3 — Admin Auth (Super Admin + Approval)

12. **Bootstrap super admin**: After publishing, visit `/admin/setup` once. If no super admin exists, you sign up with `malana.lenhard.02152003@gmail.com` + password, confirm via email OTP. That account becomes super_admin. Route then locks forever.
13. **Admin signup with approval**: Other users can request access at `/admin/signup`. You see pending requests in `/admin`, approve/reject/delete admins.
14. Roles: `super_admin`, `admin`, `pending` — stored in `user_roles` (already exists).

> **My recommendation**: Bootstrap after publish, not at build time. Build-time means hardcoding your password into code. Post-publish setup is safer and standard.

---

## Phase 4 — Full CMS

15. **Editable content**: Inline edit titles/descriptions across all pages (sections stored in `site_content` table keyed by section_id).
16. **Drag-and-drop image manager** for hero portrait, project images, gallery (uses `project-images` bucket).
17. **Manual review entry** form in `/admin` (name, stars, comment, avatar upload).
18. **AI Assistant knowledge editor**: Add facts ("I now offer pubmat design") → stored in `assistant_facts` table → injected into AI system prompt at runtime. The AI then "remembers" for all visitors.
19. **AI Assistant for editing**: When you're logged in as admin, the assistant gets edit tools (`updateSection`, `addProject`, etc.) and can modify your portfolio via chat.

---

## Technical Notes

- DB: new tables `site_content`, `reviews`, `page_views`, `assistant_facts`, `contact_messages`, `admin_signup_requests`.
- Auth: Lovable Cloud email/password + Google. OTP via standard Supabase email confirmation.
- AI assistant tools (Phase 4) use AI SDK `tools` parameter, gated by admin session.
- Realtime: enable `supabase_realtime` publication on `page_views`.

---

## Question

Which phase do you want first? I suggest **Phase 1** (bug fixes, ~30 min) then **Phase 2**, **Phase 3**, **Phase 4** in order. Or pick a custom subset (e.g. "1, 6, 11, 12").
