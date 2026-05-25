
delete from public.projects;

insert into public.projects (title, description, tags, github_url, demo_url, featured, display_order) values
('Navigent', 'Navigent — UI/UX redesign of the entire interface, starting from the landing page and creating new interactive pages for both web and mobile to elevate the AI SaaS experience.', array['Part-Time Work','Website','AI SaaS'], null, null, true, 1),
('TaskPilot', 'TaskPilot — Redesigned the website end-to-end, from landing page through the full user flow, and created new pages to enhance functionality and visual consistency.', array['Part-Time Work','Website','AI SaaS'], null, null, true, 2),
('FoodLight AI', 'Clean and user-friendly UI/UX for FoodLight AI, an AI-powered platform for mobile and web. Minimal visual style with interactive prototypes.', array['Part-Time Work','Web & Mobile','AI SaaS'], null, null, true, 3),
('FlyMingle — Travel Social App', 'NDA Project — designed the complete user flow from onboarding to account creation for five user types, creating intuitive interfaces.', array['Project-Based','Mobile App','Graphic Design'], null, null, false, 4),
('Sumisho', 'Website and Mobile UI Design for a part-time client whose end client was Sumisho. Designed the complete user interface flow.', array['Part-Time Work','Mobile App','Website'], null, null, false, 5),
('EmpowerEd', 'Learning Management System capstone project — streamlines course management, progress tracking, and student–instructor collaboration.', array['School Project','Website','LMS'], null, null, false, 6),
('Spinlit Web Game', 'Game interface and card visuals for Spinlit web game, crafted in Adobe Photoshop for a cohesive look.', array['Part-Time Work','Web Game','Graphic Design'], null, null, false, 7),
('Coin Game App', 'Mobile coin reward claiming page and modal interface — focus on clarity and accessibility.', array['Part-Time Work','Mobile Game'], null, null, false, 8),
('HPI Connect Web Registration', 'Designed during my On-the-Job Training at Hytec Power Inc. — intuitive and visually cohesive registration page.', array['OJT','Website'], null, null, false, 9),
('Hytec Power Inc Web Registration', 'Web registration page for Hytec Power Inc. — clean, user-friendly registration interface.', array['OJT','Website'], null, null, false, 10),
('NARDO''s BURGER', 'Burger E-Commerce mobile application from my 2nd year of college. Intuitive interface for ordering and managing orders.', array['School Project','Mobile App','E-Commerce'], null, null, false, 11),
('BaMo — “Bahay Mo”', 'Professional pitch deck for BaMo communicating brand vision, value proposition, and business model.', array['Part-Time Work','Pitch Deck','Presentation'], null, null, false, 12),
('Capstone Character Video', 'Video editing for our 2024 capstone project — character clips, transitions, and visual effects.', array['School Project','Video Editing'], null, null, false, 13),
('Additional Client Showcase', 'A set of graphic design pieces for various clients — posters and branding assets.', array['Graphic Design','Poster'], null, null, false, 14);
