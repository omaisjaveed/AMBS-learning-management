import pool from './config/db';
import dotenv from 'dotenv';

dotenv.config();

const seed = async () => {
  try {
    console.log('Starting data population...');

    // 1. Clear existing data (except users)
    await pool.execute('DELETE FROM settings');
    await pool.execute('DELETE FROM logos');
    await pool.execute('DELETE FROM testimonials');
    await pool.execute('DELETE FROM faqs');
    await pool.execute('DELETE FROM services');
    await pool.execute('DELETE FROM pages');

    console.log('Existing data cleared.');

    // 2. Seed Logos
    const logos = [
      { name: "Roots", image_url: "https://ik.imagekit.io/ofvhaiwug/ROOTS_Logo.jpg.webp?updatedAt=1775247440643", sort_order: 1 },
      { name: "Tuthill", image_url: "https://ik.imagekit.io/ofvhaiwug/Tuthill-Logo.jpg.webp?updatedAt=1775247440641", sort_order: 2 },
      { name: "Hoffman & Lamson", image_url: "https://ik.imagekit.io/ofvhaiwug/Hoffman-Lamson-Logo.jpg.webp?updatedAt=1775247440610", sort_order: 3 },
      { name: "Gardner Denver", image_url: "https://ik.imagekit.io/ofvhaiwug/Gardner-Denver-Logo.jpg.webp?updatedAt=1775247440625", sort_order: 4 },
      { name: "Spencer", image_url: "https://ik.imagekit.io/ofvhaiwug/Spencer-Logo.jpg.webp?updatedAt=1775247440579", sort_order: 5 },
      { name: "Quincy Compressors", image_url: "https://ik.imagekit.io/ofvhaiwug/Quincy-Compressor-Logo-web-full.webp?updatedAt=1775508800843", sort_order: 6 },
    ];

    for (const logo of logos) {
      await pool.execute('INSERT INTO logos (name, image_url, sort_order) VALUES (?, ?, ?)', [logo.name, logo.image_url, logo.sort_order]);
    }
    console.log('Logos seeded.');

    // 3. Seed Testimonials
    const testimonials = [
      {
        name: "James T.",
        position: "Plant Manager",
        company: "Industrial Manufacturing Inc.",
        content: "Lamb's Machine Works has been our go-to for blower repairs for over a decade. Their 24/7 emergency service saved our production line more times than I can count. Top-notch expertise and incredibly fast turnaround.",
        rating: 5
      },
      {
        name: "Sarah M.",
        position: "Operations Director",
        company: "Mid-South Processing",
        content: "We needed a custom blower package built to very specific requirements. The team at Lamb's not only met our specs but improved upon our initial design. Their in-house fabrication capabilities are impressive.",
        rating: 5
      },
      {
        name: "David R.",
        position: "Maintenance Supervisor",
        company: "AgriTech Solutions",
        content: "When our main gearbox failed on a holiday weekend, Lamb's was the only shop that answered the call. They had us back up and running within 48 hours. You can't put a price on that kind of reliability.",
        rating: 5
      }
    ];

    for (const t of testimonials) {
      await pool.execute(
        'INSERT INTO testimonials (name, position, company, content, rating) VALUES (?, ?, ?, ?, ?)',
        [t.name, t.position, t.company, t.content, t.rating]
      );
    }
    console.log('Testimonials seeded.');

    // 4. Seed FAQs
    const faqs = [
      { question: "What areas do you service?", answer: "We primarily service Tennessee, Mississippi, and Arkansas. We can accommodate clients outside this immediate region depending on the project scope and requirements. Reach out to discuss logistics." },
      { question: "Do you offer emergency repairs?", answer: "Yes, we offer 24/7 emergency service to ensure your critical operations experience minimal downtime. We understand that equipment failure doesn't stick to business hours." },
      { question: "Are you an authorized service center?", answer: "Yes, we are the region's premier authorized Roots distributor and service center. We are also fully equipped and highly experienced in servicing Tuthill, Gardner Denver, and Quincy Compressors." },
      { question: "Do you provide warranties on your work?", answer: "Absolutely. We stand firmly behind our craftsmanship with a comprehensive 1-year warranty on all repair and custom fabrication work." }
    ];

    for (const faq of faqs) {
      await pool.execute('INSERT INTO faqs (question, answer) VALUES (?, ?)', [faq.question, faq.answer]);
    }
    console.log('FAQs seeded.');

    // 5. Seed Services
    const services = [
      // --- Repair Shop Services ---
      {
        title: "Positive Displacement Blower Repair",
        slug: "repair-shop/blowers",
        description: "Authorized service for Roots blowers and other leading manufacturers, maximizing lifespan.",
        image: "https://ik.imagekit.io/ofvhaiwug/repairblowers.jpg.webp",
        sort_order: 1,
        content: JSON.stringify({
          introParagraphs: [
            "At Lamb's Machine Works, we have the expertise and experience to repair all major brands of positive displacement blowers including Roots, Sutorbilt, Gardner Denver DuroFlow and Cycloblower, and Tuthill (M-D Pneumatic). Repaired units have a 12-month warranty.",
            "When you send your positive displacement blower to Lamb's Machine Works, we disassemble and inspect the unit, and then provide a quote for the labor and parts required to make it like new. Once approval is received to proceed, we will rebuild the unit to factory tolerances, including necessary machining, painting, and cleaning as needed. The standard cost to repair an industrial positive displacement blower is 30%-60% of the unit replacement cost."
          ],
          processTitle: "Our 6-step process to repair positive displacement blowers is:",
          processSteps: [
            { title: "Disassembly", description: "Initial inspection, teardown, and diagnosis" },
            { title: "Cleaning", description: "Remove product and rust" },
            { title: "Inspection", description: "Identify cracks, wear, and other damage" },
            { title: "Approval", description: "Send quote for repair and receive customer approval" },
            { title: "Reassembly", description: "Rebuild unit to factory tolerances, including machining work, new gaskets and bearings, and paint" },
            { title: "Quality Assurance", description: "Check clearances and test, if applicable" }
          ],
          faqs: [
            { question: "What is your typical turnaround time for blower repairs?", answer: "Turnaround times vary based on the extent of the damage, but our standard repair time is typically 2-3 weeks. We do offer expedited emergency services." },
            { question: "Do you offer warranties on your blower rebuilds?", answer: "Yes, all our repaired positive displacement blower units come with a standard 12-month warranty covering our parts and labor." },
            { question: "Can you repair obsolete blower models?", answer: "Yes, our extensive machining capabilities allow us to fabricate reverse-engineered parts for older or obsolete blowers when OEM parts are no longer available." }
          ]
        })
      },
      {
        title: "Rotary Valve, Airlock, & Feeder Repair",
        slug: "repair-shop/airlocks",
        description: "Precision rebuilding of rotary valves and feeders to restore factory clearances.",
        image: "https://ik.imagekit.io/ofvhaiwug/Rotary-Valve-Airlock-Feeder-Repair-Feature-Image.jpg.webp",
        sort_order: 2,
        content: JSON.stringify({
          introParagraphs: [
            "At Lamb's Machine Works, we have the expertise and experience to repair all major brands of rotary valves, airlocks, and feeders including Coperion, ACS Valves, Schenck Process, and Meyer Industrial. Whether you call them rotary valves, airlocks, or feeders, our skilled technicians and machinists have the expertise to restore your equipment to optimal performance and factory specs. The standard cost to repair an industrial rotary valve is 30%-60% of the unit's replacement cost.",
            "When you send your rotary valve to Lamb's Machine Works, we disassemble and inspect the unit, and then provide a quote for the labor and parts required to make it like new. Once approval is received to proceed, we will rebuild the unit to factory tolerances, including necessary machining, painting, and cleaning as needed. Repaired units have a 12-month warranty."
          ],
          processTitle: "Our 6-step process to repair rotary valves, airlocks, and feeders is:",
          processSteps: [
            { title: "Disassembly", description: "Initial inspection, teardown, and diagnosis" },
            { title: "Cleaning", description: "Remove product and rust" },
            { title: "Inspection", description: "Identify cracks, wear, and other damage" },
            { title: "Approval", description: "Send quote for repair and receive customer approval" },
            { title: "Reassembly", description: "Rebuild unit to factory tolerances, including machining work, new gaskets and bearings, and paint" },
            { title: "Quality Assurance", description: "Check clearances and test, if applicable" }
          ],
          faqs: [
            { question: "How do you restore worn airlock rotors?", answer: "Worn rotors are typically built back up using specialized welding or metal spray techniques, then precision-machined down to exact factory tolerances to ensure proper sealing." },
            { question: "Can you upgrade my airlock's seals during a rebuild?", answer: "Yes, we can evaluate your specific application and recommend upgraded seal arrangements (like air-purged seals or Teflon) to increase the lifespan of your feeder." },
            { question: "Do you pressure test repaired rotary valves?", answer: "Absolutely. All repaired rotary valves and airlocks undergo rigorous testing to ensure they maintain the necessary pressure differential before they leave our facility." }
          ]
        })
      },
      {
        title: "Industrial Pump Repair & Rebuilding",
        slug: "repair-shop/pumps",
        description: "Comprehensive testing, re-machining, and assembly for industrial pumps.",
        image: "https://ik.imagekit.io/ofvhaiwug/Repair-Pumps-Feature.jpg.webp",
        sort_order: 3,
        content: JSON.stringify({
          introParagraphs: [
            "At Lamb's Machine Works, we have the expertise and experience to repair all major manufacturers including Goulds, Flowserve, Sihi, and Pentair. Repaired units have a 12-month warranty.",
            "When you send your industrial pump to Lamb's Machine Works, we disassemble and inspect the unit, and then provide a quote for the labor and parts required to make it like new. Our complete pump rebuilding services address all aspects of pump restoration, from worn impellers and casings to damaged shafts and mechanical seals. We meticulously disassemble, inspect, and rebuilt each pump using precision machining techniques and quality replacement parts. The standard cost to repair an industrial pump is 30%-60% of the unit replacement cost."
          ],
          processTitle: "Our 6-step process to repair industrial pumps is:",
          processSteps: [
            { title: "Disassembly", description: "Initial inspection, teardown, and diagnosis" },
            { title: "Cleaning", description: "Remove product and rust" },
            { title: "Inspection", description: "Identify cracks, wear, and other damage" },
            { title: "Approval", description: "Send quote for repair and receive customer approval" },
            { title: "Reassembly", description: "Rebuild unit to factory tolerances, including machining work, new gaskets and bearings, and paint" },
            { title: "Quality Assurance", description: "Check clearances and test, if applicable" }
          ],
          faqs: [
            { question: "What types of industrial pumps do you repair?", answer: "We repair a wide variety including centrifugal pumps, vacuum pumps, boiler feed pumps, and progressive cavity pumps from all major manufacturers." },
            { question: "Do you offer complete pump rebuilding?", answer: "Yes. We address all aspects of pump restoration, from repairing worn impellers and casings to replacing damaged shafts and mechanical seals." },
            { question: "Are your pump repairs tested?", answer: "All rebuilt pumps go through a rigorous quality assurance phase where we verify clearances and perform applicable performance testing before delivery." }
          ]
        })
      },
      {
        title: "Industrial Gearbox Repair & Rebuilding",
        slug: "repair-shop/gearboxes",
        description: "Complete gearbox overhauls including gear replacement and dynamic balancing.",
        image: "https://ik.imagekit.io/ofvhaiwug/Drive-pinion.jpg(gearboxes).webp",
        sort_order: 4,
        content: JSON.stringify({
          introParagraphs: [
            "At Lamb's Machine Works, we have the expertise and experience to repair all major brands of gearboxes, including Falk, Dodge, Sumitomo, Boston Gear, and more. Our skilled technicians have decades of combined experience repairing industrial gearboxes.",
            "When you send your gearbox to Lamb's Machine Works, we disassemble and inspect the unit, and then provide a quote for the labor and parts required to make it like new. Once approval is received to proceed, we will rebuild the unit to factory tolerances, including necessary machining, bearings, seals, and cleaning as needed. The standard cost to repair an industrial gearbox is 30%-60% of the unit replacement cost."
          ],
          processTitle: "Our 6-step process to repair industrial gearboxes is:",
          processSteps: [
            { title: "Disassembly", description: "Initial inspection, teardown, and diagnosis" },
            { title: "Cleaning", description: "Remove product and rust" },
            { title: "Inspection", description: "Identify cracks, wear, and other damage" },
            { title: "Approval", description: "Send quote for repair and receive customer approval" },
            { title: "Reassembly", description: "Rebuild unit to factory tolerances, including machining work, new gaskets and bearings, and paint" },
            { title: "Quality Assurance", description: "Check clearances and test, if applicable" }
          ],
          faqs: [
            { question: "What gearbox brands do you service?", answer: "We repair all major brands including Falk, Dodge, Sumitomo, SEW-Eurodrive, Boston Gear, and many specialized industrial models." },
            { question: "Do you manufacture replacement gears?", answer: "Yes. If an OEM gear is obsolete or backordered, our extensive in-house machining facility can reverse-engineer and manufacture custom gears to factory specifications." },
            { question: "Can you analyze why my gearbox failed?", answer: "Yes. During our rigorous teardown and inspection process, our technicians evaluate wear patterns and damage to help identify the root cause of the failure, whether it's misalignment, lubrication issues, or overloading." }
          ]
        })
      },
      {
        title: "Custom Blower Packages",
        slug: "repair-shop/custom-blowers",
        description: "Custom-configured blower packages matched exactly to your process requirements.",
        image: "https://ik.imagekit.io/ofvhaiwug/Blower-package-1.jpg.webp",
        sort_order: 5,
        content: JSON.stringify({
          subtitle: "Tailored to Your Specific Industrial Requirements",
          introParagraphs: [
            "Our expert team combines decades of machining experience with cutting-edge engineering to deliver robust, efficient solutions that maximize your blower's performance and longevity.",
            "We don't simply build custom blower packages, we engineer solutions that drive your business forward."
          ],
          features: [
            "Weather-resistant construction", 
            "Acoustic dampening for noise reduction", 
            "Ventilation and cooling", 
            "Easy maintenance and access panels"
          ],
          processSteps: [
            { title: "Engineering & Design", description: "After understanding your needs, our engineering team will share a preliminary design and ensure that the final design meets all performance and operational constraints." },
            { title: "Fabrication & Assembly", description: "Using precision machining and fabrication techniques, we will assemble and mount all components." },
            { title: "Quality Assurance", description: "Every blower package is tested to verify performance and reliable operation." },
            { title: "Installation Support", description: "Our team is available 24/7 to provide installation support and technical troubleshooting to ensure optimal performance of your blower package." }
          ],
          faqs: [
            { question: "Do you design for specific industrial sectors?", answer: "Yes, we custom-engineer blower packages specialized for petrochemical, food & beverage, mining, and wastewater applications." },
            { question: "What materials do you use for the enclosures?", answer: "We routinely utilize carbon steel, stainless steel, and aluminum depending on the environmental constraints and sanitary requirements of your facility." },
            { question: "Can you match my existing factory footprint?", answer: "Absolutely. During the 'Engineering & Design' phase, our team ensures the exact footprint layout is factored into the 3D model, ensuring drop-in replacement capability." }
          ]
        })
      },

      // --- Machine Shop Services ---
      {
        title: "On-Site & Mobile Welding",
        slug: "machine-shop/welding",
        description: "Expert welding services brought directly to your facility, ensuring precision repairs with minimal downtime.",
        image: "https://ik.imagekit.io/ofvhaiwug/on-site-and-mobile-welding-application.jpg%20(1).webp",
        sort_order: 10,
        content: JSON.stringify({
          subtitle: "Rapid Response Welding and Fabrication Services at Your Facility",
          introText: "When equipment fails or modifications are needed immediately, our mobile welding teams bring the machine shop to you. We specialize in industrial-grade welding and fabrication designed to minimize your downtime and keep production moving.",
          capabilitiesTitle: "Mobile Welding Capabilities",
          capabilities: [
            { title: "TIG, MIG & Stick Welding", description: "Comprehensive welding processes suitable for various materials including stainless steel, aluminum, and carbon steel." },
            { title: "Emergency Repairs", description: "24/7 availability for critical breakdowns, structural repairs, and piping emergencies." },
            { title: "Structural Fabrication", description: "On-site construction and modification of platforms, catwalks, supports, and structural framework." },
            { title: "Piping & Pressure Vessels", description: "Code-compliant welding for process piping, steam lines, and specialized containment systems." },
            { title: "Heavy Equipment Repair", description: "Restoration of heavy industrial machinery, loader buckets, wear plates, and industrial shredders." },
            { title: "Custom Fit-Ups", description: "Precision cutting, fitting, and installation of fabricated components directly in your plant environment." }
          ],
          faqs: [
            { question: "What types of metals can you weld on-site?", answer: "Our mobile teams are equipped to weld a wide variety of metals including carbon steel, stainless steel, aluminum, cast iron, and exotic alloys." },
            { question: "Do you offer emergency call-out services?", answer: "Yes, we offer 24/7 emergency mobile welding services to minimize your production downtime." },
            { question: "Are your welders certified?", answer: "Absolutely. Our welders hold relevant certifications and undergo regular training to ensure compliance with the highest industry standards." }
          ]
        })
      },
      {
        title: "Portable Machining",
        slug: "machine-shop/portable",
        description: "High-precision on-site machining tailored for complex, large-scale industrial equipment.",
        image: "https://ik.imagekit.io/ofvhaiwug/Chris-on-site-flange-facing.jpg.webp",
        sort_order: 11,
        content: JSON.stringify({
          subtitle: "Precision On-Site Machining to Minimize Equipment Downtime",
          introText: "Dismantling heavy equipment and shipping it to a machine shop is costly and time-consuming. Our portable machining services bring high-precision tooling directly to your project site, allowing us to repair and modify your equipment in place.",
          capabilitiesTitle: "Portable Machining Services",
          capabilities: [
            { title: "Line Boring", description: "Precision restoration of worn or damaged bores on heavy equipment, gearboxes, and industrial machinery." },
            { title: "Flange Facing", description: "Re-machining of damaged flange faces to ensure proper sealing for pipes, valves, and pressure vessels." },
            { title: "Portable Milling", description: "On-site milling for motor bases, pump pads, and structural foundations to achieve precise flatness." },
            { title: "Shaft Turning", description: "In-place turning of worn shafts, journals, and trunnions without the need for complete disassembly." },
            { title: "Drilling & Tapping", description: "Heavy-duty on-site drilling, tapping, and stud removal for large industrial components." },
            { title: "Laser Alignment", description: "Precision laser alignment services to ensure rotating equipment is perfectly aligned post-machining." }
          ],
          faqs: [
            { question: "How accurate is portable machining compared to shop machining?", answer: "With our advanced portable equipment and skilled technicians, we frequently achieve tolerances just as tight as those produced in a traditional machine shop environment." },
            { question: "What size flanges can you face on-site?", answer: "Our portable flange facing equipment can handle a wide range of sizes, from small process piping to massive heat exchanger flanges." },
            { question: "Do you repair heavy construction equipment?", answer: "Yes, line boring for heavy equipment articulated joints, buckets, and booms is a major part of our portable machining services." }
          ]
        })
      },
      {
        title: "In-House Machining & Fab",
        slug: "machine-shop/in-house",
        description: "State-of-the-art facility equipped to handle specialized multi-stage fabrication projects.",
        image: "https://res.cloudinary.com/dxyaxgbjl/image/upload/v1778881116/InHouseMachiningPageImage_g7etlw.jpg",
        sort_order: 12,
        content: JSON.stringify({
          subtitle: "Comprehensive CNC and Manual Machining at our State-of-the-Art Facility",
          introText: "Our fully equipped machine shop handles everything from large-scale industrial repairs to precision manufacturing of custom parts. With a mix of heavy-duty manual machines and advanced CNC capabilities, we deliver exactly what you need, when you need it.",
          capabilitiesTitle: "Our Shop Capabilities",
          capabilities: [
            { title: "CNC Turning & Milling", description: "High-precision computer-controlled machining for complex parts, tight tolerances, and high-volume production runs." },
            { title: "Large Capacity Manual Machining", description: "Heavy-duty lathes and mills capable of handling massive shafts, rollers, and industrial components." },
            { title: "Reverse Engineering", description: "Creating exact replacements for worn, broken, or obsolete parts using precision measurement and CAD modeling." },
            { title: "Custom Fabrication", description: "Start-to-finish fabrication integrating cutting, forming, welding, and final machining of complex assemblies." },
            { title: "Dynamic Balancing", description: "Precision dynamic balancing for rotors, impellers, fans, and shafts to ensure vibration-free operation." },
            { title: "Heat Treating & Finishing", description: "Coordination of structural heat treating, stress relieving, and specialized surface coatings (chrome, carbide)." }
          ],
          faqs: [
            { question: "What is your maximum machining capacity?", answer: "Our heavy-duty lathes and horizontal boring mills are sized to accommodate monumental industrial parts. Contact us with your specific dimensions." },
            { question: "Can you manufacture a part if I don't have the original drawings?", answer: "Yes! Reverse engineering is one of our core strengths. We can measure your broken part and manufacture a perfect replacement." },
            { question: "Do you offer emergency rush jobs for the machine shop?", answer: "Yes, we offer expedited rush services, reallocating our skilled machinists to get your critical components back in operation." }
          ]
        })
      },
      {
        title: "Auger Fabrication",
        slug: "machine-shop/auger",
        description: "Custom auger design and fabrication designed for durability and optimal material handling.",
        image: "https://ik.imagekit.io/ofvhaiwug/Custom-Auger-Fabrication-Content.jpg.webp",
        sort_order: 13,
        content: JSON.stringify({
          subtitle: "Custom Design, Fabrication, and Repair of Industrial Augers",
          introText: "Augers and screw conveyors are the lifeblood of many bulk material handling systems. When they wear out or fail, production grinds to a halt. We specialize in the custom fabrication, repair, and hardfacing of continuous flighting, sectional augers, and mixing screws.",
          capabilitiesTitle: "Auger & Screw Conveyor Solutions",
          capabilities: [
            { title: "Custom Flighting Fabrication", description: "Design and creation of custom auger flights tailored to your specific material handling requirements." },
            { title: "Shaft Replacement & Straightening", description: "Precision repair or direct replacement of bent, worn, or broken auger center shafts." },
            { title: "Hardfacing & Wear Coating", description: "Application of specialized wear-resistant coatings (tungsten carbide, hardface alloys) to dramatically extend auger lifespan." },
            { title: "Stainless Steel & Exotic Alloys", description: "Fabrication of sanitary augers for the food and chemical industries using stainless steel and specialized alloys." },
            { title: "Sectional & Ribbon Augers", description: "Manufacturing of standard solid flighting, ribbon flights, cut-and-fold, and custom mixing configurations." },
            { title: "Complete Conveyor Assemblies", description: "Turnkey design and fabrication of complete screw conveyor systems, including troughs, drives, and bearings." }
          ],
          faqs: [
            { question: "Can you reverse engineer a worn-out auger?", answer: "Absolutely. We often receive completely worn or broken augers and can determine original pitch and diameter for exact replacement." },
            { question: "How do you protect augers from abrasive materials?", answer: "We offer AR (Abrasion Resistant) steel flighting, weld hardfacing on edges, and custom ceramic or urethane coatings." },
            { question: "Do you build food-grade augers?", answer: "Yes, we specialize in fabricating and polishing stainless steel augers that meet strict sanitary requirements." }
          ]
        })
      },
      {
        title: "Leak Boxes",
        slug: "machine-shop/leak-boxes",
        description: "Engineered leak repair enclosures ensuring fast, safe, and reliable containment.",
        image: "https://ik.imagekit.io/ofvhaiwug/custom-leak-boxes.jpg.webp",
        sort_order: 14,
        content: JSON.stringify({
          subtitle: "Engineered Containment Solutions for Pipeline active Leaks",
          introText: "When shutting down a pipeline is not an option, our custom-engineered leak boxes provide a safe, effective, and permanent or temporary solution to encapsulate active leaks under pressure.",
          capabilitiesTitle: "Leak Containment Engineering",
          capabilities: [
            { title: "Custom Enclosure Design", description: "Rapid engineering of clamshell leak boxes tailored to the exact dimensions of flanges, valves, elbows, or straight pipe." },
            { title: "High-Pressure Capabilities", description: "Fabrication of robust enclosures rated for high-pressure steam, chemical, and gas lines." },
            { title: "Exotic Material Fabrication", description: "Construction utilizing specialized alloys designed to withstand highly corrosive or extremely hot chemical environments." },
            { title: "Injectable Sealant Systems", description: "Boxes equipped with precisely placed injection valves for the application of high-temperature sealing compounds." },
            { title: "Rapid Turnaround", description: "Emergency fabrication services to deliver critical leak containment devices when minutes matter." },
            { title: "ASME Code Compliance", description: "Welding and fabrication strictly adhering to ASME codes, complete with material traceability and NDT testing." }
          ],
          faqs: [
            { question: "How fast can a custom leak box be fabricated?", answer: "In emergency situations, we offer expedited 24/7 engineering and fabrication, often delivering within days or hours." },
            { question: "Can leak boxes handle high-temperature steam lines?", answer: "Yes, we engineer and build enclosures specifically designed for high-temperature and high-pressure steam applications." },
            { question: "Are these temporary or permanent repairs?", answer: "Our enclosures are engineered to structural standards that allow them to remain in place safely for extended periods." }
          ]
        })
      }
    ];

    for (const s of services) {
      await pool.execute(
        'INSERT INTO services (title, slug, description, image, sort_order, content) VALUES (?, ?, ?, ?, ?, ?)',
        [s.title, s.slug, s.description, s.image, s.sort_order, s.content]
      );
    }
    console.log('All 10 Services seeded.');

    // 6. Seed Home Page
    const homeContent = {
      hero: {
        title: "Precision Machining & Repair Solutions",
        subtitle: "The Mid-South's trusted leader since 1976. Authorized Roots Distributor & Service Center specializing in blowers, airlocks, and custom fabrication.",
        bg_image: "https://ik.imagekit.io/ofvhaiwug/Hero-Banner.jpg.webp",
        cta_text: "Request a Quote",
        cta_url: "/contact"
      },
      seo: {
        title: "Industrial Equipment Repair & Service",
        description: "Lamb's Machine Works specializes in Roots blowers, airlocks, and custom fabrication for Tennessee, Mississippi, and Arkansas."
      },
      about: {
        heading: "Nearly 50 Years of Excellence.",
        description: "Founded in 1976, Lamb's Machine Works is the Mid-South's trusted leader in industrial equipment repair and service. We specialize in Roots blowers, airlocks, feeders, pumps, and gearboxes. We keep your operations running with fast, reliable solutions backed by decades of expertise.",
        image_1: "https://ik.imagekit.io/ofvhaiwug/Machine-Shop-Services.jpg.webp",
        image_2: "https://res.cloudinary.com/dxyaxgbjl/video/upload/f_auto,q_auto/v1777927410/IMG_8842_wzgzzs.jpg",
        video_url: "https://res.cloudinary.com/dxyaxgbjl/video/upload/v1777927410/IMG_8842_wzgzzs.mp4"
      },
      bottom_cta: {
        heading: "Ready to elevate your industrial operations?",
        description: "Contact our engineering and fabrication team today for rapid emergency service, detailed quotes, or custom solutions.",
        btn1_text: "Contact Us Now",
        btn1_url: "/contact"
      }
    };

    await pool.execute(
      'INSERT INTO pages (title, slug, content) VALUES (?, ?, ?)',
      ['Home', 'home', JSON.stringify(homeContent)]
    );
    console.log('Home Page seeded.');

    // Seed About Page
    const aboutContent = {
      hero: {
        title: "About Lamb's Machine Works",
        subtitle: "Nearly 50 years of excellence in industrial equipment repair and precision machining.",
        bg_image: "https://ik.imagekit.io/ofvhaiwug/Machine-Shop-Services.jpg.webp"
      },
      content: {
        heading: "A Trusted Partner Since 1976",
        body: "For nearly 50 years, Lamb’s Machine Works has been a trusted partner serving everyone from local family-owned businesses to Fortune 500 corporations, keeping their critical machinery running by providing expert repairs, precision machining, preventive maintenance, custom solutions and rapid emergency response when downtime isn’t an option. When repairs are not an option, we also sell new equipment as an authorized distributor for various manufacturers.\n\nLamb's Machine Works serves customers across a 6-hour radius of Memphis and the whole of Arkansas, supporting diverse industries including chemical manufacturing, meat & poultry processing, food & beverage production, and steel & iron fabrication.\n\nWhile we’ve expanded our reach and capabilities over the decades, we’ve never lost sight of what made us successful: treating every customer’s downtime as our own emergency and delivering the precision craftsmanship that keeps operations moving forward.",
        image_1: "https://ik.imagekit.io/ofvhaiwug/Machine-Shop-Services.jpg.webp",
        image_2: "https://res.cloudinary.com/dxyaxgbjl/video/upload/f_auto,q_auto/v1777927410/IMG_8842_wzgzzs.jpg",
        video_url: "https://res.cloudinary.com/dxyaxgbjl/video/upload/v1777927410/IMG_8842_wzgzzs.mp4"
      },
      seo: {
        title: "About Us | Industrial Repair Experts",
        description: "Learn about Lamb's Machine Works, serving Memphis and the Mid-South with precision industrial equipment repairs since 1976."
      }
    };
    await pool.execute('INSERT INTO pages (title, slug, content) VALUES (?, ?, ?)', ['About Us', 'about', JSON.stringify(aboutContent)]);

    // Seed Custom Solutions Page
    const customContent = {
      hero: {
        title: "Custom Solutions",
        subtitle: "Tailored engineering and fabrication to meet your unique industrial challenges.",
        bg_image: "https://ik.imagekit.io/ofvhaiwug/Hero-Banner.jpg.webp"
      },
      content: {
        heading: "Engineered for Your Specific Needs",
        body: "At Lamb's Machine Works, we understand that off-the-shelf solutions don't always fit the bill. Our custom solutions division specializes in designing, engineering, and fabricating equipment tailored exactly to your operational requirements.\n\nWhether you need a specialized blower package, custom auger fabrication, or unique machining for obsolete parts, our experienced team has the expertise to deliver.",
        image_1: "https://ik.imagekit.io/ofvhaiwug/Machine-Shop-Services.jpg.webp",
        image_2: "https://ik.imagekit.io/ofvhaiwug/Boring-in-progress.jpg.webp",
        video_url: ""
      },
      seo: {
        title: "Custom Industrial Solutions | Precision Engineering",
        description: "Custom-engineered industrial solutions, precision fabrication, and tailored equipment modifications to meet your exact specifications."
      }
    };
    await pool.execute('INSERT INTO pages (title, slug, content) VALUES (?, ?, ?)', ['Custom Solutions', 'custom-solutions', JSON.stringify(customContent)]);

    // Seed Buy New Equipment Page
    const buyNewContent = {
      hero: {
        title: "Buy New Equipment",
        subtitle: "Request a quote for new industrial equipment, parts, and systems. Our experts will help you find the right solution.",
        bg_image: "https://ik.imagekit.io/ofvhaiwug/repairblowers.jpg.webp"
      },
      content: {
        heading: "Equipment Inquiry Form",
        body: "Request a quote for new industrial equipment, parts, and systems from leading manufacturers like Roots, Tuthill, Gardner Denver, and more.",
        image_1: "",
        image_2: "",
        video_url: ""
      },
      seo: {
        title: "Buy New Industrial Equipment | Authorized Distributor",
        description: "Request a quote for new industrial equipment, parts, and systems from leading manufacturers like Roots, Tuthill, Gardner Denver, and more."
      }
    };
    await pool.execute('INSERT INTO pages (title, slug, content) VALUES (?, ?, ?)', ['Buy New Equipment', 'buy-new-equipment', JSON.stringify(buyNewContent)]);

    console.log('Group A Pages seeded.');

    // 7. Seed Global Settings
    const settings = [
      { key: 'site_name', value: "Lamb's Machine Works", type: 'text' },
      { key: 'contact_email', value: 'sales@lambsmachineworks.com', type: 'text' },
      { key: 'contact_phone', value: '901-775-0663', type: 'text' },
      { key: 'emergency_phone', value: '901-775-0663', type: 'text' },
      { key: 'address', value: '296 East Mallory Avenue, Memphis, TN 38109', type: 'text' },
      { key: 'google_maps_embed', value: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3266.3533966035!2d-90.0526!3d35.0847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDA1JzA0LjkiTiA5MMKwMDMnMDkuNCJX!5e0!3m2!1sen!2sus!4v1623123456789!5m2!1sen!2sus', type: 'text' },
      { key: 'facebook_url', value: 'https://facebook.com/lambsmachine', type: 'text' },
      { key: 'linkedin_url', value: 'https://www.linkedin.com/company/lambsmachineworks/', type: 'text' },
      { key: 'youtube_url', value: '', type: 'text' },
      { key: 'business_hours', value: JSON.stringify([
        { days: 'Monday - Friday', hours: '8:00 AM - 4:30 PM' },
        { days: 'Saturday - Sunday', hours: 'Emergency Service Only' }
      ]), type: 'json' }
    ];

    for (const setting of settings) {
      await pool.execute(
        'INSERT INTO settings (`key`, `value`, `type`) VALUES (?, ?, ?)',
        [setting.key, setting.value, setting.type]
      );
    }
    console.log('Global Settings seeded.');

    console.log('Data population complete successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seed();
