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
  resume: "resume.pdf",            // put resume.pdf in this folder, then write "resume.pdf"
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
    summary: "A bolt-on mount for the solar car's parking brake lever, taken from a waterjet aluminum bracket to a printed two-piece clamshell over seven revisions.",
    body: `American Solar Challenge rules require a parking brake that holds the car in place and locks with one motion from the driver's seat. On MS16 the team used a bike brake pulled by a toggle clamp, and it only just passed scrutineering: slack crept into the cable, and the PLA mount kept sliding along the chassis tube.

The holder mounts the toggle clamp at the bottom-front corner of the cockpit on the left side, where the front hoop leg, the side diagonal, the bottom rail and two chassis-base tubes meet. That spot is by the driver's left hand and on the same side as the bike brake, so the cable run stays short. Every revision keeps the same three goals: it can't slide on the tubes, the cable loop closes inside one rigid part so it holds tension, and it needs no welding.

The revision history below shows each version and what changed from the one before.`,
    link: "",
    images: ["images/pb-revF-iso.png"],
    revisions: [
      {
        rev: "Rev A",
        date: "Oct 27",
        title: "Waterjet aluminum bracket, clamped to two tubes",
        why: "First answer to the MS16 problems: replace the sliding PLA mount with metal that can't move.",
        changes: [
          "3/16\" 5052-H32 aluminum bracket, waterjet cut with two bends: web, lever shelf and a bent-up tab as the cable-housing stop.",
          "Clamped with saddle caps to two tubes that run in different directions (one on the 1.5\" front leg, two on the 1.25\" diagonal), so the constraint comes from geometry rather than friction. Six #10-32 bolts, no welding.",
          "Cable stop on the same part as the lever, plus an M10×1 barrel adjuster to take up slack before scrutineering.",
          "About 375 g of parts plus 80 g of hardware."
        ],
        images: [
          {src: "images/pb-revA-drivers-eye.png", caption: "Rev A from the driver's seat"},
          {src: "images/pb-revA-outboard.png", caption: "Rev A from outside: caps on two crossing tubes"}
        ]
      },
      {
        rev: "Rev B",
        date: "Oct 28",
        title: "Stronger bracket and a bolted stop block",
        why: "FEA at 900 N of cable tension found 344 MPa at the relief notch where the shelf ended, so Rev A would have yielded at roughly 500 N.",
        changes: [
          "1/4\" sheet with one bend instead of 3/16\" with two.",
          "Bent tab replaced by a separate solid stop block bolted to the shelf, so the cable load never goes around a bend or a notch.",
          "Thicker tube caps (5–5.7 mm of wall over the tube) and fine-thread #8-36 clamp screws.",
          "Result: 53 MPa peak at 900 N (about 3.6× margin to yield) and 0.05 mm deflection. A 300 N push on the handle dropped from 135 MPa (SF 1.4) to 85 MPa (SF 2.3).",
          "About 545 g of machined parts."
        ],
        images: [
          {src: "images/pb-revB-fea.png", caption: "von Mises stress at 900 N cable tension: Rev A (left) vs Rev B (right)"}
        ]
      },
      {
        rev: "Rev C2",
        date: "Nov 2",
        title: "3D-printed two-piece clamshell with a load rib",
        changes: [
          "Switched from machined aluminum to two printed halves that clamp around the bottom rail, the diagonal and the front leg, split through the tube centres.",
          "The inboard FRONT piece fills the V between the tubes so it's braced against the frame, and carries the lever shelf and cable stop. The outboard BACK piece holds the nuts.",
          "New 10 mm triangular rib under the shelf at about 47°, so pushing the handle puts the rib in compression straight into the rail instead of bending the shelf root.",
          "Five #10-32 bolts through both halves with a 1.5 mm gap at the split, so tightening clamps the tubes. Channels open up 2 mm near the node to clear the weld fillets.",
          "Printed in PETG or tougher (not PLA, which softens and creeps)."
        ],
        images: [
          {src: "images/pb-revC2-cockpit.png", caption: "Rev C2 from inside the cockpit"},
          {src: "images/pb-revC2-rib.png", caption: "The load rib, seen from below"}
        ]
      },
      {
        rev: "Rev D",
        date: "Nov 5",
        title: "Rebuilt as native SolidWorks parts and simulated",
        changes: [
          "FRONT and BACK modeled feature by feature in SolidWorks: tube channels, clamp gap, #10-32 bolt holes and counterbores, lever shelf, cable stop, load rib, #8-36 clamp screw holes and the M10×1 adjuster hole.",
          "Simulated in printed PETG with a 300 N push on the handle and 900 N on the cable stop: about 4.7 MPa peak stress."
        ]
      },
      {
        rev: "Rev E",
        date: "Nov 11",
        title: "Lighter FRONT, features moved to BACK, metric hardware",
        changes: [
          "Lever shelf, clamp pad, three shelf ribs and the braced cable stop moved from the FRONT piece to the BACK piece.",
          "Weight-saving windows cut into both halves. FRONT went from 426 to 227 cm³ and the pair from about 622 to 524 cm³.",
          "#10-32 bolts replaced with M4 bolts and nylon-insert nuts sitting in printed hex pockets. Material set to ABS.",
          "All 31 sketches fully defined, driven by 62 equations, and placed on the chassis model with zero interferences."
        ]
      },
      {
        rev: "Rev F",
        date: "Nov 12",
        title: "Tapped cable adjuster, real mates and the two-thread rule",
        changes: [
          "Cable stop hole tapped M10×1 for a modeled barrel adjuster, and pockets added for the bolt heads.",
          "Assemblies built with real mates instead of fixed parts: 155 mates, none failed, and zero clashes with the chassis.",
          "Checked every bolt against the two-thread rule (at least two threads past the nut): all 11 pass."
        ],
        images: [
          {src: "images/pb-revF-outboard.png", caption: "Rev F: lever, cable and adjuster on the BACK piece"},
          {src: "images/pb-revF-in-car.png", caption: "Rev F on the chassis at the bottom-front cockpit node"}
        ]
      },
      {
        rev: "#8-32",
        date: "Nov 12–16",
        title: "Rule-compliant hardware and seat clearance",
        changes: [
          "M4 hardware swapped for McMaster #8-32 socket head screws with all-metal Flex-Top locknuts, as the sprint rules ask for on brake fasteners. All bolts still pass the two-thread rule (6.4–7.1 threads past the nut).",
          "Checked against the seat and front mount in the sprint assembly: at least 40.8 mm of clearance, and 59.3 mm at the lever."
        ]
      }
    ]
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

The result is a fully working, Class 3R-safe (≤5 mW) instrument for about $100 CAD. The video on GitHub shows it being played.`,
    link: "https://github.com/Alfietaba/Laser-Harp",
    linkText: "Watch the video ↗",
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
