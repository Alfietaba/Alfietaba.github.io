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
    summary: "A bolt-on mount for the solar car's parking brake lever, taken from a waterjet aluminum bracket to a printed two-piece clamshell over eight revisions.",
    body: `American Solar Challenge rules require a parking brake that holds the car in place and locks with one motion from the driver's seat. On MS16 the team used a bike brake pulled by a toggle clamp, and it only just passed scrutineering: slack crept into the cable, and the PLA mount kept sliding along the chassis tube.

The holder mounts the toggle clamp at the bottom-front corner of the cockpit on the left side, where the front hoop leg, the side diagonal, the bottom rail and two chassis-base tubes meet. That spot is by the driver's left hand and on the same side as the bike brake, so the cable run stays short. Every revision keeps the same three goals: it can't slide on the tubes, the cable loop closes inside one rigid part so it holds tension, and it needs no welding.

We sized everything from quick Fermi estimates: a hard one-handed push is about 10 kg, or 100 N, and the toggle clamp multiplies that about 3× into roughly 300 N of cable pull. The FEA then checked each design at 3× those loads.

Revs A to D came out of the F26 dynamics design sprint, which I did with a six-person team. Revs E and F and the hardware swap are follow-up work after the sprint. The revision history below shows each version, why it changed, and how it compared.`,
    link: "",
    images: ["images/pb-revF-iso.png"],
    revisions: [
      {
        rev: "Rev A",
        date: "Oct 27",
        title: "A bent aluminum bracket, clamped to two tubes",
        why: "The MS16 cable kept going slack, and our thesis was that the mount was sliding or twisting on the chassis tube. The fix: lock the holder down so it has no freedom.",
        changes: [
          "One 3/16\" 5052-H32 aluminum plate, waterjet cut and bent twice into a web, a lever shelf and a bent-up tab for the cable-housing stop.",
          "Clamped with saddle caps to two tubes that run in different directions (one on the 1.5\" front leg, two on the 1.25\" diagonal), so it has zero degrees of freedom. The constraint comes from geometry, not friction. Six #10-32 bolts, no welding.",
          "The cable stop sits on the same bracket as the lever, so the pull stays inside the part. An M10×1 barrel adjuster takes up slack before scrutineering.",
          "Why it changed: FEA showed a small notch by the bend taking far more than the aluminum can handle. It would have bent at about 500 N."
        ],
        stats: [["Parts", "6 metal"], ["Weight", "377 g"], ["Moves", "0.87 mm"], ["Withstands", "~500 N (bends)"]],
        images: [
          {src: "images/pb-revA-drivers-eye.png", caption: "Rev A from the driver's seat"},
          {src: "images/pb-revA-outboard.png", caption: "Rev A from outside: caps on two crossing tubes"}
        ]
      },
      {
        rev: "Rev B",
        date: "Oct 28",
        title: "Thicker plate and a bolted stop",
        why: "FEA at 900 N of cable tension found 344 MPa at the relief notch where the shelf ended, so we got rid of that bend entirely.",
        changes: [
          "1/4\" plate with one bend instead of 3/16\" with two.",
          "The cable stop became its own solid block bolted to the shelf, so the cable load never goes around a bend or a notch.",
          "Thicker tube caps, and fine-thread #8-36 clamp screws because of vibration.",
          "Result: the worst spot dropped from 344 MPa to 53 MPa, and it moves only 0.05 mm.",
          "Why it changed: 7 metal parts to cut, bend and drill, at about 545 g. So we switched to 3D printing."
        ],
        stats: [["Parts", "7 metal"], ["Weight", "~545 g"], ["Moves", "0.05 mm"], ["Withstands", "~3,300 N"]],
        images: [
          {src: "images/pb-revB-fea.png", caption: "von Mises stress at 900 N cable tension: Rev A (left) vs Rev B (right)"}
        ]
      },
      {
        rev: "Rev C",
        date: "",
        title: "All 3D printed, in two pieces",
        why: "Based on feedback from Meeji, we replaced the 7 metal parts with 2 printed ones.",
        changes: [
          "Two printed halves clamp around the bottom rail, the diagonal and the front leg, split through the tube centres.",
          "The inboard FRONT piece wraps half of each tube and sits in the crease between them as a downward brace. The outboard BACK piece wraps the other half and holds the nuts.",
          "2 parts and 5 bolts instead of 7 metal parts, with nothing to cut or bend, and the crease takes the push.",
          "Why it changed: plastic is much weaker than aluminum in bending, and the shelf stuck out with nothing under it."
        ],
        stats: [["Parts", "2 printed + 5 bolts"], ["Weight", "~425 g"], ["Moves", "no FEA"]],
        images: [
          {src: "images/pb-revC2-cockpit.png", caption: "The printed clamshell from inside the cockpit"}
        ]
      },
      {
        rev: "Rev C2",
        date: "Nov 2",
        title: "A rib under the handle",
        changes: [
          "Added a 10 mm rib under the handle side of the shelf, running down to the bottom tube at about 47°.",
          "Pushing the handle now puts the rib in compression straight into the chassis instead of bending the shelf.",
          "Five #10-32 bolts through both halves with a 1.5 mm gap at the split, so tightening clamps the tubes. The channels open up 2 mm near the node to clear the weld fillets.",
          "Why it changed: the corners were steps instead of fillets, which concentrate stress, and the part was one huge boss extrude nobody could edit."
        ],
        stats: [["Parts", "2 printed + 5 bolts"], ["Weight", "~425 g"], ["Moves", "no FEA"]],
        images: [
          {src: "images/pb-revC2-rib.png", caption: "The load rib, seen from below"}
        ]
      },
      {
        rev: "Rev D",
        date: "Nov 5",
        title: "More ribs, rebuilt and simulated",
        changes: [
          "Added two more ribs under the shelf (Rib1 and Rib2), so the handle push is shared between them.",
          "Rebuilt both pieces feature by feature in SolidWorks, with filleted rib roots and editable features in place of the single boss extrude.",
          "Same FEA test as before (300 N on the handle plus 900 N on the cable, in printed PETG): the FRONT now moves 0.13 mm instead of 0.15 mm, at 3× our Fermi loads. It takes about 8,200 N of cable pull before the plastic gives.",
          "BACK piece with every bolt snugged: it moves 0.23 mm, and each bolt can take about 3,000 N before the plastic gives.",
          "Still 2 printed pieces and 5 bolts. Nothing else had to change."
        ],
        stats: [["Parts", "2 printed + 5 bolts"], ["Weight", "~435 g + ribs"], ["Moves", "0.13 mm"], ["Withstands", "~8,200 N"]],
        images: [
          {src: "images/pb-revD-ribs.png", caption: "Rev D FRONT piece in SolidWorks, with the new ribs under the shelf"},
          {src: "images/pb-revD-fea-front.png", caption: "FRONT piece FEA: 300 N on the handle and 900 N on the cable"},
          {src: "images/pb-revD-fea-back.png", caption: "BACK piece FEA with the bolts tightened"}
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
    id: "vex-push-back",
    title: "VEX V5 Robot: Push Back",
    kind: "Competition robot · Team 32032T",
    discipline: "Robotics",
    year: "2025–26",
    summary: "A block-scoring robot with a tall frame, an angled chain conveyor and a roller scorer. It reached the finals at the Niagara Battlefields VEX V5 Competition.",
    body: `In Push Back, robots collect blocks and score them in goals, including a long goal raised above the field. This was the second robot I led the design and build of for the TanenbaumCHAT robotics team, which I founded.

The robot is a tall box frame of aluminum C-channel, so blocks travel up through the inside. A mesh-covered plate at the front guides blocks into an angled chain conveyor with flexible flaps, which pulls them up a mesh ramp. At the top, rubber-band-wrapped rollers push the blocks out into the goal. It drives on omni and traction wheels, and the autonomous and driver-control code is written in VEXcode.

Scoring was unreliable at first, so I made the mechanisms more tolerant, using flexible wheels and elastic suspension so blocks still fed through when they weren't lined up perfectly.

How it's different from my first robot (High Stakes): the High Stakes robot was low and open, built to grab a mobile goal with a pneumatic clamp and carry it around, with a ring intake running up over the top of the chassis. Push Back is the opposite approach. Instead of carrying a goal, the robot carries the game pieces itself: blocks are pulled in at the front and travel up through a tall, enclosed box frame on an internal conveyor, then get pushed out at the top into goals raised above the field. That meant designing for height and a long, controlled path for each block rather than a strong grip on one goal. The pneumatic clamp and air tank gave way to a chain conveyor, a mesh ramp and rubber-band rollers, and the intake went from spinning rollers to a mesh guide plate that funnels blocks into the conveyor.

The robot advanced to the finals at the Niagara Battlefields VEX V5 Competition (about 20 teams). Off the field, I recruited 80 members and split them into drivetrain, intake, scoring and autonomous sub-teams, and the club won Best Club Award (2026) out of more than 200 clubs.`,
    link: "https://github.com/Alfietaba/VEX-V5-Robots",
    linkText: "Photos and videos on GitHub ↗",
    images: ["images/vex-push-back-1.jpg", "images/vex-push-back-2.jpg", "images/vex-push-back-3.jpg"],
    videos: [
      {src: "images/vex-push-back-intake.mp4", poster: "images/vex-push-back-intake.jpg", caption: "Driving up and running a block through the intake"},
      {src: "images/vex-push-back-drive.mp4", poster: "images/vex-push-back-drive.jpg", caption: "Driving and turning during testing"}
    ]
  },
  {
    id: "vex-high-stakes",
    title: "VEX V5 Robot: High Stakes",
    kind: "Competition robot",
    discipline: "Robotics",
    year: "2024–25",
    summary: "A ring-scoring robot with a pneumatic mobile-goal clamp and a chain hook intake, my first VEX V5 build.",
    body: `In High Stakes, robots pick up rings and score them on stakes, including mobile goals a robot can grab and carry. This was the first robot I built after teaching myself the VEX V5 platform from scratch and founding the TanenbaumCHAT robotics team.

A pneumatic piston, fed from an onboard air tank with a pressure gauge, drives a clamp at the back of the robot, so it can grab a mobile goal and carry it while scoring. An angled chain conveyor runs from the front intake up to the top, where a large red gear drives the top roller, lifting rings up and onto the goal.

The V5 Brain sits in the middle of a drive base with omni and traction wheels. The club won Most Improved Club (2025) that season, out of more than 200 clubs.`,
    link: "https://github.com/Alfietaba/VEX-V5-Robots",
    linkText: "Photos and videos on GitHub ↗",
    images: ["images/vex-high-stakes-1.jpg", "images/vex-high-stakes-2.jpg", "images/vex-high-stakes-3.jpg"],
    videos: [
      {src: "images/vex-high-stakes-clamp-1.mp4", poster: "images/vex-high-stakes-clamp-1.jpg", caption: "Driving up to a mobile goal and clamping it"},
      {src: "images/vex-high-stakes-clamp-2.mp4", poster: "images/vex-high-stakes-clamp-2.jpg", caption: "Grabbing a mobile goal and driving off with it"}
    ]
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
