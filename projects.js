/* ============================================================
   THIS IS THE ONLY FILE YOU EDIT.
   Change your details in SITE, and add projects to PROJECTS.
   Keep the quotes and commas exactly as in the examples.
   ============================================================ */

window.SITE = {
  name: "Alfie Tabachnick",
  status: "",                      // a short status line next to a green dot (leave "" to hide it)
  intro: "Mechatronics Engineering at the University of Waterloo. I build robots, instruments, car parts and study tools.",
  about: "I'm in Mechatronics Engineering at the University of Waterloo (B.A.Sc., 2026–2031), on the dynamics sub-team of the Midnight Sun solar car. I work in SolidWorks and AutoCAD, prototype circuits and sensors, and program in Arduino, C++ and Python. In high school I founded a VEX robotics team that grew to 80 members and won Best Club (2026), and I was president of the JSU student union, which grew from 350 to 425 members.",
  offDuty: "Off the clock: competitive rowing with Argonaut Rowing Club, weightlifting, weekly in-pool rehabilitation swimming at Holland Bloorview, and tutoring math and science.",
  email: "aastabac@uwaterloo.ca",
  linkedin: "https://www.linkedin.com/in/alfie-tabachnick-195706337",
  github: "https://github.com/Alfietaba",
  resume: "",                      // put resume.pdf in this folder, then write "resume.pdf"
  photo: ""                        // put a photo in images/, then write "images/me.jpg"
};

/* Projects show in this order. To add one, copy the template at the
   bottom, paste it above the closing ]; and fill it in.

   id       short and unique: lowercase letters, numbers and dashes only
   body     the write-up; leave a blank line between paragraphs
   link     optional: a repo, demo or video ("" to leave it off)
   images   files you put in the images/ folder; the first is the cover */

window.PROJECTS = [
  {
    id: "parking-brake",
    title: "Parking Brake Lever Holder",
    kind: "Midnight Sun solar car",
    discipline: "Mechanical",
    year: "2026",
    summary: "A bolt-on lever mount for the solar car's parking brake that stays put, replacing one that only just passed scrutineering.",
    body: `American Solar Challenge rules require a parking brake that holds the car in place and locks with one motion from the driver's seat. On MS16 the team used a bike brake pulled by a toggle clamp, and it only just passed scrutineering: slack crept into the cable, and the PLA mount kept sliding along the chassis tube.

For the F26 dynamics design sprint we mapped every tube in the frame from the CAD and chose the bottom-front corner of the cockpit, where five tubes meet. It is right by the driver's left hand and on the same side as the bike brake, so the cable run stays short.

Instead of gripping one tube, the bracket clamps onto two tubes that run in different directions, so it physically can't slide or twist and the thin tubes aren't over-tightened. There is no welding: small spacers make up the difference in tube sizes, and six bolts take it off. The toggle clamp, cable stop and barrel adjuster all sit on the same bracket, so the cable pull stays inside the part instead of tugging on the frame.

A stress simulation showed one small notch carrying most of the load. A thicker plate and a bolted cable block moved the load into flat, solid metal. The bracket is a single waterjet-cut plate with one bend, and the clamp holes are drilled after bending using the clamp as a guide.

Result: 3–4× stronger than required, 6 bolts to remove, 1 bend in the main bracket, and about 545 g for all the metal parts. Still to do: the piece that ties the cable to the latch, a driver hip-clearance check, and a re-run of the simulation once the final loads are in.`,
    link: "",
    images: ["images/parking-brake-1.png", "images/parking-brake-2.png"]
  },
  {
    id: "midterm-gym",
    title: "Midterm Gym",
    kind: "Study app",
    discipline: "Software",
    year: "2026",
    summary: "A study app that makes you think first, then shows you exactly why.",
    body: `Midterm Gym is an open-source study app built with Claude. It has 619 practice questions and 85 question generators for first-year courses such as MATH 115 (Linear Algebra for Engineering) and chemistry.

You answer before you see the explanation, and every answer is checked by code. A topic counts as mastered after four correct in a row, and the app tracks course progress, XP and levels, with a formula sheet one click away. It works on desktop and on a phone.`,
    link: "https://github.com/Alfietaba/Midterm-Gym",
    images: ["images/midterm-gym-1.png", "images/midterm-gym-2.png", "images/midterm-gym-3.png"]
  },
  {
    id: "laser-harp",
    title: "Laser Harp",
    kind: "Optical MIDI instrument",
    discipline: "Embedded",
    year: "2026",
    summary: "A 6-beam laser harp that turns beam-breaks into real-time MIDI notes.",
    body: `Notes were being missed or played late. The photoresistors had a 20–100 ms response time, too slow to catch a hand passing through a beam in about 30 ms, so I switched to PT334-6C phototransistors.

Ambient light caused false triggers, so I designed two-stage sensor tunnels with 8 mm and 5.2 mm bores.

The signal chain depended on fragile software (a Hairless MIDI bridge and the Mac IAC Driver). Switching to an ATmega32U4 Pro Micro gave native USB MIDI and removed that software entirely.

The result is a fully working, Class 3R-safe (≤5 mW) instrument for about $100 CAD.`,
    link: "",
    images: []
  },
  {
    id: "vex-robot",
    title: "VEX V5 Competition Robot",
    kind: "Competition robot",
    discipline: "Robotics",
    year: "2024–2026",
    summary: "Two competition robots for autonomous and driver-control tasks, built by a team I founded.",
    body: `I taught myself the VEX V5 platform from scratch and led the design and build of two robots. I built and designed the chassis, drivetrains, intake and loading system, scorer and parking mechanisms.

Scoring was unreliable, so I switched to tolerant designs with flexible wheels and elastic suspension.

I founded the school's competitive robotics team, recruited 80 members, and organized them into drivetrain, intake, scoring and autonomous sub-teams. The robot advanced to the finals at the Niagara Battlefields VEX V5 Competition (about 20 teams), and the team won Most Improved Club (2025) and Best Club Award (2026) out of more than 200 clubs.`,
    link: "",
    images: []
  },
  {
    id: "big-data-bowl",
    title: "Big Data Bowl 2027",
    kind: "NFL Football Operations competition",
    discipline: "Data / ML",
    year: "2026",
    summary: "Using machine learning on NFL player data to find how combine metrics relate to on-field performance.",
    body: `An ongoing entry in the Big Data Bowl 2027 competition. I'm using machine learning on AWS NFL player data to see how combine metrics relate to on-field performance.

I'm developing hypotheses about which combine metrics best predict a strong Wide Receiver, for example highest on-field separation and best catch probability on low-percentage targets.`,
    link: "",
    images: []
  },
  {
    id: "political-compass",
    title: "Pre-Election Political Compass",
    kind: "Data visualization",
    discipline: "Software",
    year: "2024–2025",
    summary: "A data-driven political compass in Java that plots responses on dynamic graphs using emojis.",
    body: `I built a political compass in Java that shows each user's responses on dynamic graphs, using emojis.

I used the responses to understand political bias at my school, and used the results to teach students about the upcoming election.`,
    link: "",
    images: []
  }
];

/* TEMPLATE: copy from { to }, and put a comma after the project before it.

  {
    id: "my-new-project",
    title: "My New Project",
    kind: "What it is",
    discipline: "Mechanical / Embedded / Software",
    year: "2027",
    summary: "One sentence on what it is.",
    body: `First paragraph: the problem.

Second paragraph: what you built and how.

Third paragraph: how it turned out.`,
    link: "https://github.com/your-username/my-new-project",
    images: ["images/my-new-project-1.jpg", "images/my-new-project-2.jpg"]
  }
*/
