/* =========================================================
   Imagine City: คืนสุดท้ายก่อนสีจะหายไป
   script.js

   โครงไฟล์
   1. ตั้งค่า (CONFIG)
   2. ข้อมูลสาขา / ผลลัพธ์
   3. เนื้อเรื่องและคำถาม
   4. ฟอร์มบัตรผ่าน
   5. ระบบคิดคะแนน
   6. ดวงไฟ (canvas)
   7. โลกด้านหลัง
   8. หน้าจอแต่ละแบบ
   9. ตัวควบคุมลำดับเกม
   ========================================================= */

/* ---------- 1. ตั้งค่า ---------- */
const CONFIG = {
  MIX_GAP: 1,                // ห่างกันไม่เกินกี่คะแนนถึงขึ้นผลลัพธ์ผสม
  DISTRICT_GAP: 1,           // ห่างกันไม่เกินกี่คะแนนถึงพาไปย่านที่สองด้วย
  UNI_URL: "https://www.spu.ac.th/", // ลิงก์เว็บมหาวิทยาลัย (ปุ่มหน้าผลลัพธ์)
  SUBSCRIBE_URL: "https://www.facebook.com/SPUsripatumuniversity", // ลิงก์ "สมัครรับข่าวสาร"
  START_HOUR: 23,            // นาฬิกาเริ่มที่ 23:00
  MINUTES_PER_SCENE: 5,      // ตอบหนึ่งฉาก นาฬิกาเดิน 5 นาที
  SHARE_URL: "imagine-city-pearl.vercel.app", // ลิงก์เว็บ (โผล่ท้ายการ์ดแชร์)
  HASHTAG: "#ImagineCitySDM",
};

const ORDER = ["DGA", "DGD", "IGD", "AFX", "DEN"];

/* ---------- 2. ข้อมูลสาขา / ผลลัพธ์ ----------
   หมายเหตุ: ในเอกสารโจทย์ ชื่อผลลัพธ์และชื่อย่านเขียนไว้ 2 แบบ
   ตอนนี้ใช้ชื่อจาก "ตารางแมพคำตอบ" ส่วนชื่ออีกแบบใส่ไว้ใน altName
   ถามอาจารย์แล้วค่อยสลับได้ */
const MAJORS = {
  DGA: {
    name: "นักเสกจินตนาการ",
    altName: "นักรังสรรค์จินตนาการ",
    color: "#f1c84a",
    major: "Digital Arts",
    district: "ย่านศิลป์: ตรอกจินตนาการ",
    image: "images/dga.webp",
    story: "ภาพวาดของเธอคือสีแรกที่ย้อมเมืองให้กลับมามีชีวิต ทุกคนเงยหน้ามองแล้วพูดตรงกันว่า \"นี่แหละโลกที่เราเคยฝันถึง\"",
    careers: ["Illustrator", "Concept Artist", "Character Designer", "Webtoon / Comic Artist", "Storyboard Artist", "Background Artist", "Art Toy Designer", "Sticker / LINE Creator", "Children's Book Illustrator", "Visual Development Artist"],
  },
  DGD: {
    name: "นักออกแบบประจำเมือง",
    altName: "นักสร้างอัตลักษณ์แห่งธานี",
    color: "#866bf7",
    major: "Digital Graphic Design",
    district: "ย่านดีไซน์: ถนนเอกลักษณ์",
    image: "images/dgd.webp",
    story: "ภาพลักษณ์ใหม่ที่เธอออกแบบทำให้ทั้งเมืองมีหน้าตาเป็นของตัวเอง ไม่มีใครสับสนอีกแล้วว่าที่นี่คือที่ไหน",
    careers: ["Graphic Designer", "Brand Identity Designer", "Art Director", "UI Designer", "Packaging Designer", "Editorial Designer", "Social Media Designer", "Motion Graphic Designer", "Poster / Key Visual Designer", "Creative Director"],
  },
  IGD: {
    name: "นักสร้างสนามเล่น",
    altName: "นักสร้างเป้าหมายแห่งเกม",
    color: "#9dda78",
    major: "Interactive and Game Design",
    district: "ย่านเกม: สนามแห่งการเล่น",
    image: "images/igd.webp",
    story: "ทั้งเมืองกลายเป็นสนามเล่นของเธอ ทุกคนหัวเราะ ตื่นเต้น และไม่มีใครอยากให้เกมจบ",
    careers: ["Game Designer", "Level Designer", "Game Artist", "UI/UX Designer for Games", "VR / AR Designer", "Game Producer", "Narrative Designer", "Technical Artist", "Playtest Designer", "Esports Content Producer"],
  },
  AFX: {
    name: "นักปั้นภาพให้มีชีวิต",
    altName: "ผู้มอบชีวิตแด่ภาพ",
    color: "#f055b8",
    major: "Computer Animation and Visual Effects",
    district: "ย่านภาพยนตร์: กำแพงแห่งเรื่องราว",
    image: "images/afx.webp",
    story: "ภาพเคลื่อนไหวของเธอทำให้ท้องฟ้าสว่างวาบ ไม่มีใครเชื่อว่าทั้งหมดนี้เป็นฝีมือคนคนเดียว",
    careers: ["3D Animator", "3D Modeler", "VFX Artist", "Compositor", "Rigging Artist", "Lighting Artist", "Texture Artist", "Motion Capture Artist", "Layout / Previs Artist", "Visual Effects Supervisor"],
  },
  DEN: {
    name: "นักรวมใจคนทั้งเมือง",
    altName: "ผู้รวมใจให้เป็นหนึ่ง",
    color: "#a2d9fd",
    major: "Digital Entertainment",
    district: "ย่านบันเทิง: เวทีแห่งตัวตน",
    image: "images/den.webp",
    story: "เธอไม่ได้ขึ้นเวทีคนเดียว เธอทำให้ทั้งเมืองได้ขึ้นเวทีไปพร้อมกัน",
    careers: ["Content Creator", "Event / Show Producer", "Streaming Producer", "VTuber / Virtual Talent Producer", "Entertainment Marketer", "Social Media Manager", "Video Producer", "Community Manager", "Scriptwriter", "Brand Experience Designer"],
  },
};

// ผลลัพธ์ผสม (key = รหัสสองสาขาเรียงตามตัวอักษร)
const MIXED = {
  "DGA+DGD": "นักออกแบบที่เล่าเรื่องด้วยภาพวาด",
  "AFX+DGD": "นักออกแบบที่ทำให้ภาพขยับ",
  "DGD+IGD": "นักออกแบบประสบการณ์",
  "DEN+DGD": "นักออกแบบที่เล่าเรื่องเก่ง",
  "AFX+DGA": "นักวาดที่ทำให้ภาพมีชีวิต",
  "DGA+IGD": "นักวาดโลกของเกม",
  "DEN+DGA": "ครีเอเตอร์สายวาด",
  "AFX+IGD": "นักสร้างโลกเสมือนจริง",
  "AFX+DEN": "นักเล่าเรื่องด้วยภาพยนตร์",
  "DEN+IGD": "นักสร้างสนามเล่นให้คนมารวมกัน",
};
const pairKey = (a, b) => [a, b].sort().join("+");

// จุดตัดบรรทัดของชื่อผลลัพธ์ (กันคำตกบรรทัดแบบ "นักสร้างโลกเสมือน / จริง")
// "|" = ตำแหน่งที่ยอมให้ขึ้นบรรทัดใหม่ได้ ถ้าจอกว้างพอจะอยู่บรรทัดเดียว
const TITLE_BREAKS = Object.fromEntries([
  "นักเสก|จินตนาการ", "นักออกแบบ|ประจำเมือง", "นักสร้าง|สนามเล่น", "นักปั้นภาพ|ให้มีชีวิต", "นักรวมใจ|คนทั้งเมือง",
  "นักออกแบบที่|เล่าเรื่องด้วยภาพวาด", "นักออกแบบ|ที่ทำให้ภาพขยับ", "นักออกแบบ|ประสบการณ์", "นักออกแบบ|ที่เล่าเรื่องเก่ง",
  "นักวาด|ที่ทำให้ภาพมีชีวิต", "นักวาด|โลกของเกม", "ครีเอเตอร์|สายวาด", "นักสร้าง|โลกเสมือนจริง",
  "นักเล่าเรื่อง|ด้วยภาพยนตร์", "นักสร้างสนามเล่น|ให้คนมารวมกัน",
].map(t => [t.replace("|", ""), t.split("|")]));
const titleChunks = t => TITLE_BREAKS[t] || [t];
const titleHTML = t => titleChunks(t).map(w => `<span class="nowrap">${w}</span>`).join("<wbr>");

/* ---------- 3. เนื้อเรื่องและคำถาม ---------- */
// mood = สีหน้าของดวงไฟ (normal / happy / sad / think / wow / excited)
// say  = คำพูดของดวงไฟในฉากนั้น
const CHAPTERS = {
  1: { title: "บทที่ 1 ตื่นขึ้นในเมืองไร้สี", text: "ทุกอย่างรอบตัวเธอกลายเป็นสีเทา แต่มือของเธอยังขยับได้ และยังมีอะไรให้ทำอีกมากมาย", mood: "sad", say: "ทุกอย่างเป็นสีเทาไปหมดเลย…" },
  2: { title: "บทที่ 2 ปัญหาของชาวเมือง", text: "เดินไปได้ไม่กี่ก้าว เธอก็เจอคนที่ต้องการความช่วยเหลือทุกมุมถนน", mood: "wow", say: "มีคนต้องการความช่วยเหลือ!" },
  3: { title: "บทที่ 3 ย่านของเธอ", text: "ดวงไฟพาเธอเดินเข้าไปในย่านที่ใกล้ตัวเธอที่สุด", mood: "excited", say: "ย่านนี้รู้สึกคุ้น ๆ ไหม" },
  4: { title: "บทที่ 4 เพื่อนร่วมทาง", text: "ประตูหินเปิดออก และเธอไม่ได้เดินต่อคนเดียวอีกแล้ว", mood: "happy", say: "เย้ มีเพื่อนแล้ว!" },
  5: { title: "บทที่ 5 คืนเทศกาล", text: "ฟ้ามืดลงแล้ว ไฟทั่วเมืองเริ่มติด เหลือแค่เวทีใหญ่ที่ยังว่างอยู่", mood: "excited", say: "เทศกาลเริ่มแล้ว!" },
};

// ของ 5 ชิ้นในฉาก 1.2: รูปที่กลุ่มวาด วางไว้ใน images/ ตามชื่อไฟล์นี้
// (ยังไม่มีรูป จะโชว์ชื่อสั้น ๆ แทน) ความหมายเต็มจะเฉลยหลังเลือก
const ITEMS = {
  DGA: { name: "ดินสอวิเศษ", image: "images/item-dga.webp" },
  DGD: { name: "ชุดองค์ประกอบ", image: "images/item-dgd.webp" },
  IGD: { name: "จอยเกม", image: "images/item-igd.webp" },
  AFX: { name: "คาถาเวทมนตร์", image: "images/item-afx.webp" },
  DEN: { name: "ไมโครโฟน", image: "images/item-den.webp" },
};

// วิเคราะห์ลักษณะนิสัยของแต่ละผลลัพธ์ (โชว์ในหน้าผลลัพธ์)
const PERSONALITY = {
  DGA: {
    trait: "เธอมองโลกเป็นภาพ ช่างสังเกตรายละเอียดเล็ก ๆ ที่คนอื่นมองข้าม รู้สึกลึกซึ้งกับสิ่งรอบตัว และถ่ายทอดความรู้สึกผ่านภาพได้ดีกว่าคำพูด",
    strengths: ["จินตนาการกว้าง คิดภาพใหม่ ๆ ได้เสมอ", "ช่างสังเกต เก็บรายละเอียดเก่ง", "มีสไตล์เป็นของตัวเอง"],
    watch: ["บางครั้งจมอยู่กับรายละเอียดจนงานไม่จบ", "อ่อนไหวกับคำวิจารณ์ผลงาน"],
  },
  DGD: {
    trait: "เธอคิดเป็นระบบ ชอบความเป็นระเบียบ มองออกว่าอะไรควรอยู่ตรงไหน และใส่ใจเสมอว่าคนอื่นจะเข้าใจสิ่งที่เธอสื่อหรือเปล่า",
    strengths: ["ทำเรื่องยากให้เข้าใจง่าย", "มีรสนิยม ตาดีเรื่องสีและตัวอักษร", "ใส่ใจคนที่ใช้งานจริง"],
    watch: ["อยากให้ทุกอย่างสมบูรณ์แบบ จนแก้งานไม่รู้จบ", "เครียดง่ายเมื่ออะไร ๆ ไม่เป็นระเบียบ"],
  },
  IGD: {
    trait: "เธอชอบตั้งคำถามว่าสิ่งต่าง ๆ ทำงานยังไง สนุกกับการแก้ปัญหาและลองผิดลองถูก และมองทุกอย่างเป็นด่านท้าทายที่รอให้ผ่าน",
    strengths: ["คิดเป็นขั้นตอน วางระบบเก่ง", "กล้าทดลอง ไม่กลัวพลาด", "ทำให้เรื่องธรรมดากลายเป็นเรื่องสนุก"],
    watch: ["เบื่อง่ายเมื่อต้องทำอะไรซ้ำ ๆ", "บางครั้งสนใจกลไกจนลืมมองภาพรวม"],
  },
  AFX: {
    trait: "เธออดทนและใจเย็น เชื่อว่าสิ่งยิ่งใหญ่เกิดจากความตั้งใจทีละนิด และมีความสุขที่สุดตอนได้เห็นสิ่งที่อยู่ในหัวกลายเป็นจริงต่อหน้า",
    strengths: ["อดทนสูง ทำงานละเอียดได้นาน", "ตาไวเรื่องการเคลื่อนไหวและแสง", "ตั้งใจจนงานสำเร็จ"],
    watch: ["ทุ่มเทจนลืมพัก", "ชอบเก็บตัวทำงานคนเดียว ลืมขอความช่วยเหลือ"],
  },
  DEN: {
    trait: "เธอเข้าใจคนเก่ง มีพลังบวก กล้าแสดงออก และมีความสุขที่สุดตอนได้เห็นทุกคนสนุกไปด้วยกัน การเชื่อมคนเข้าหากันเป็นเรื่องธรรมชาติของเธอ",
    strengths: ["สื่อสารเก่ง พูดแล้วคนอยากฟัง", "เป็นผู้นำ รวมทีมได้", "สร้างบรรยากาศให้ทุกคนสนุก"],
    watch: ["แคร์ความรู้สึกคนอื่นจนลืมตัวเอง", "เหนื่อยง่ายถ้าต้องอยู่กับคนเยอะนาน ๆ โดยไม่ได้พัก"],
  },
};

// คำพูดตอนแตะดวงไฟ
const TAP_LINES = ["ฮี่ ๆ จั๊กจี้!", "ไปต่อกันเถอะ!", "ฉันอุ่นใช่ไหมล่ะ", "อย่าปล่อยให้ฉันดับนะ", "เธอทำได้แน่นอน!", "ว้าย!"];

// 11 ฉากที่นับคะแนน
const SCENES = {
  "1.1": {
    mood: "think", say: "เริ่มจากอะไรดีนะ",
    label: "บทที่ 1 · ฉาก 1.1", title: "ตื่นขึ้นมา",
    text: 'ดวงไฟลอยมาใกล้ ๆ แล้วกระซิบว่า <span class="whisper">"เหลือเวลาถึงคืนนี้เท่านั้นนะ ช่วยเมืองนี้ด้วย"</span> สิ่งแรกที่เธอทำคือ…',
    choices: {
      DGA: "หยิบชอล์กขึ้นมาแล้วลงสีบนกำแพง",
      DGD: "เดินดูป้ายที่ตัวอักษรซีดจนอ่านไม่ออก แล้วลองจัดใหม่ให้อ่านง่ายขึ้น",
      IGD: "ถามดวงไฟว่าเมืองนี้มีกติกาอะไร แล้วจะผ่านด่านไปได้ยังไง",
      AFX: "ลองดันของรอบตัวเบา ๆ ว่าทำไมทุกอย่างถึงนิ่งสนิทแบบนี้",
      DEN: "ตะโกนเรียกคนในเมืองให้มารวมกันที่จัตุรัส",
    },
  },
  "1.2": {
    mood: "excited", say: "เลือกได้ชิ้นเดียว ลากใส่กระเป๋าเลย!", interaction: "drag",
    label: "บทที่ 1 · ฉาก 1.2", title: "ของติดตัว",
    text: "ดวงไฟบอกว่าพกไปได้แค่ชิ้นเดียว เธอเลือกหยิบ… <span class=\"whisper\">(ลากของใส่กระเป๋า หรือแตะที่ของก็ได้)</span>",
    choices: {
      DGA: "ดินสอวิเศษที่วาดได้ไม่มีวันหมด",
      DGD: "ชุดองค์ประกอบวิเศษ ทั้งสี รูปทรง และตัวอักษร ที่ทำให้อะไรก็ดูเข้าทีเข้าทาง",
      IGD: "จอยเกมเก่า ๆ ที่ยังไม่มีใครรู้วิธีเล่น",
      AFX: "คาถาเวทมนตร์ที่เสกให้ภาพนิ่งขยับได้",
      DEN: "ไมโครโฟนที่เสียงดังไปทั่วทั้งเมือง",
    },
  },
  "1.3": {
    mood: "think", say: "ห้าสาย… ไปทางไหนดี",
    label: "บทที่ 1 · ฉาก 1.3", title: "ทางแยกห้าสาย",
    text: "ปลายจัตุรัสมีถนนห้าสาย แต่ละสายมีกลิ่นกับเสียงไม่เหมือนกัน เธอเดินเข้าสายไหนก่อน",
    choices: {
      DGA: "สายที่ผนังทั้งสองข้างเต็มไปด้วยภาพวาด",
      DGD: "สายที่เต็มไปด้วยป้ายร้านและโลโก้",
      IGD: "สายที่มีเสียงเกมกับแสงไฟหลากสี",
      AFX: "สายที่มีเสียงเครื่องฉายหนังกับควันเอฟเฟกต์",
      DEN: "สายที่มีเสียงเพลงและผู้คนมายืนรวมกัน",
    },
  },
  "2.1": {
    mood: "wow", say: "ระวัง! สะพานพัง",
    label: "บทที่ 2 · ฉาก 2.1", title: "สะพานที่พังครึ่งหนึ่ง",
    text: "สะพานข้ามแม่น้ำพังไปครึ่งทาง ฝั่งโน้นมีคนรออยู่ เธอจะข้ามไปยังไง",
    choices: {
      DGA: "วาดสะพานขึ้นมาใหม่ด้วยเส้นและสีในแบบของเธอ",
      DGD: "ทำป้ายเตือนกับป้ายบอกทางอ้อม ให้ทุกคนเดินตามได้โดยไม่งง",
      IGD: "ไขกลไกของสะพานให้กลับมาทำงานอีกครั้ง",
      AFX: "ทำภาพสะพานที่ค่อย ๆ ประกอบตัวเองขึ้นมาให้ทุกคนเห็น",
      DEN: "ชวนชาวเมืองมาช่วยกันซ่อม แล้วจัดเป็นงานฉลองเล็ก ๆ",
    },
  },
  "2.2": {
    mood: "sad", say: "หนูน้อยร้องไห้อยู่…",
    label: "บทที่ 2 · ฉาก 2.2", title: "เด็กน้อยร้องไห้",
    text: "เด็กคนหนึ่งนั่งร้องไห้อยู่ข้างทาง เธอบอกว่าตัวการ์ตูนที่รักที่สุดหายไปจากเมืองแล้ว เธอช่วยหนูน้อยยังไง",
    choices: {
      DGA: "วาดตัวการ์ตูนตัวนั้นขึ้นมาใหม่ให้",
      DGD: "ทำสติกเกอร์ โปสเตอร์ และของที่ระลึกให้เธอเก็บไว้",
      IGD: "สร้างเกมเล็ก ๆ ให้เธอได้เล่นกับตัวการ์ตูนตัวนั้น",
      AFX: "ทำให้ตัวการ์ตูนมีชีวิตขึ้นมา เดินและพูดกับเธอได้",
      DEN: "ชวนเด็ก ๆ คนอื่นมานั่งล้อมวงฟังเรื่องของตัวการ์ตูนตัวนั้น",
    },
  },
  "2.3": {
    mood: "sad", say: "ร้านน่ารักขนาดนี้ ไม่อยากให้ปิดเลย",
    label: "บทที่ 2 · ฉาก 2.3", title: "ร้านเก่าแก่ที่ใกล้ปิด",
    text: "เจ้าของร้านเก่าแก่เล่าว่าไม่มีใครรู้จักร้านเขาแล้ว เธอตอบเขาว่า…",
    choices: {
      DGA: "\"หนูจะวาดภาพให้ร้านนี้มีเอกลักษณ์ไม่เหมือนใคร\"",
      DGD: "\"หนูจะทำแบรนด์ใหม่ให้ ตั้งแต่โลโก้ไปจนถึงป้ายหน้าร้าน\"",
      IGD: "\"หนูจะทำให้การเดินเข้าร้านเป็นเหมือนเล่นเกมสนุก ๆ\"",
      AFX: "\"หนูจะทำคลิปแนะนำร้านที่ดูแล้วขนลุก\"",
      DEN: "\"หนูจะจัดงานแล้วช่วยโปรโมต ให้คนแห่กันมา\"",
    },
  },
  gate: {
    mood: "think", say: "ประตูพูดได้ด้วย! ตอบให้ดีนะ",
    label: "ด่านทดสอบ", title: "ประตูหิน",
    text: 'ไม่ว่าเธอจะเดินมาจากย่านไหน ทุกคนต้องเจอประตูหินบานใหญ่ก่อนไปต่อ ประตูถามว่า <span class="whisper">"เธอพร้อมฝึกอะไรทุกวัน"</span>',
    choices: {
      DGA: "วาดรูปและสังเกตโลกรอบตัวให้ละเอียดขึ้น",
      DGD: "จัดองค์ประกอบ สี และตัวอักษรให้ลงตัว",
      IGD: "คิดเป็นระบบ เป็นขั้น เป็นตอน",
      AFX: "ทำให้ภาพเคลื่อนไหวและดูสมจริง",
      DEN: "พูด เล่าเรื่อง และประสานคนให้ไปทางเดียวกัน",
    },
  },
  "4.1": {
    mood: "happy", say: "ทีมเราต้องมีเธอ",
    label: "บทที่ 4 · ฉาก 4.1", title: "เจอเพื่อนสี่คน",
    text: "ที่ลานน้ำพุ เธอเจอนักเดินทางอีกสี่คน แต่ละคนมีของที่ตัวเองยังทำไม่ได้ เธอเลือกเป็นคนที่…",
    choices: {
      DGA: "ช่วยวาดภาพให้ทุกคนเห็นตรงกัน",
      DGD: "ทำไกด์ให้ทุกอย่างดูลงตัวและเป็นระเบียบ",
      IGD: "คิดวิธีให้ทุกคนทำงานด้วยกันแล้วสนุก",
      AFX: "ทำตัวอย่างสั้น ๆ ให้เห็นว่าแผนจะออกมาหน้าตาเป็นยังไง",
      DEN: "เป็นคนกลางที่ทำให้ทุกคนอยากเดินต่อไปด้วยกัน",
    },
  },
  "4.2": {
    mood: "think", say: "เถียงกันอีกแล้ว…",
    label: "บทที่ 4 · ฉาก 4.2", title: "เพื่อนเห็นไม่ตรงกัน",
    text: "กลางทางมีสองแยก ทีมเถียงกันว่าจะไปทางไหน เธอทำอะไร",
    choices: {
      DGA: "วาดแผนที่ให้เห็นภาพว่าแต่ละทางไปไหนบ้าง",
      DGD: "ทำตารางเปรียบเทียบให้ตัดสินใจง่ายขึ้น",
      IGD: "เสนอให้ลองไปทั้งสองทางแล้วดูผลลัพธ์",
      AFX: "ทำภาพจำลองให้เห็นว่าปลายทางของแต่ละทางเป็นยังไง",
      DEN: "ฟังทุกคนก่อน แล้วหาจุดที่ทุกคนรับได้",
    },
  },
  "5.1": {
    mood: "excited", say: "เวทีเป็นของเธอแล้ว!",
    label: "บทที่ 5 · ฉาก 5.1", title: "ขึ้นเวที",
    text: "เวทีว่างเปล่ากำลังรอเธออยู่ ไฮไลต์ที่เธออยากมอบให้ทั้งเมืองคือ…",
    choices: {
      DGA: "ภาพวาดขนาดยักษ์ที่คนทั้งเมืองเงยหน้ามอง",
      DGD: "ภาพลักษณ์ใหม่ของเมือง ที่ทำให้ทุกมุมดูมีสไตล์เดียวกัน",
      IGD: "เกมที่คนทั้งเมืองเข้ามาเล่นพร้อมกัน",
      AFX: "โชว์ภาพเคลื่อนไหวกับเอฟเฟกต์ที่ทำให้ทั้งลานตะลึง",
      DEN: "การแสดงสดที่ทุกคนมีส่วนร่วมได้",
    },
  },
  "5.2": {
    mood: "wow", say: "สีกลับมาแล้ว ดูสิ!",
    label: "บทที่ 5 · ฉาก 5.2", title: "สีกลับมาแล้ว",
    text: "เมื่อสีค่อย ๆ กลับมาทั่วเมือง ผู้คนหันมามองเธอ เธออยากให้พวกเขาจำเธอว่าเป็นใคร",
    choices: {
      DGA: "คนที่ให้กำเนิดตัวละครที่ทุกคนรัก",
      DGD: "คนที่ทำให้เมืองนี้ดูดีและมีเอกลักษณ์",
      IGD: "คนที่สร้างโลกให้ทุกคนได้เข้ามาเล่น",
      AFX: "คนที่ทำให้สิ่งที่ดูเป็นไปไม่ได้กลายเป็นจริง",
      DEN: "คนที่ทำให้ทุกคนมารวมกันได้",
    },
  },
};
const SCORED_TOTAL = Object.keys(SCENES).length; // 11

// บทที่ 3: ย่าน (ไม่นับคะแนน ใช้เลือกอาชีพที่ขึ้นก่อน)
const DISTRICTS = {
  DGA: {
    text: 'ศิลปินสูงวัยคนหนึ่งยื่นขวดสีวิเศษให้ แล้วถามว่า <span class="whisper">"เธออยากเป็นคนแบบไหนในเมืองนี้"</span>',
    options: [
      ["คนที่สร้างตัวละครให้ทั้งโลกจำได้", "Character Designer"],
      ["คนที่วาดโลกและฉากหลังให้เรื่องเล่ามีชีวิต", "Concept Artist / Background Artist"],
      ["คนที่เล่าเรื่องด้วยภาพหลายช่อง", "Webtoon / Comic / Storyboard Artist"],
      ["คนที่ทำให้ภาพวาดกลายเป็นสินค้าหรือของสะสม", "Illustrator / Art Toy / Sticker Creator"],
    ],
  },
  DGD: {
    text: 'นักออกแบบคนหนึ่งยืนอยู่หน้าร้านที่ป้ายยังว่างเปล่า แล้วถามว่า <span class="whisper">"ถ้าได้ฝากลายเซ็นไว้ที่ไหนสักแห่งในเมืองนี้ เธออยากให้เป็นที่ไหน"</span>',
    options: [
      ["ป้ายและโลโก้ที่ทุกคนเห็นทุกวัน", "Brand Identity Designer"],
      ["หน้าจอแอปและเว็บไซต์ของเมือง", "UI Designer"],
      ["กล่องและแพ็กเกจที่ใคร ๆ ก็อยากเก็บไว้", "Packaging Designer"],
      ["โปสเตอร์ใหญ่กลางเมืองที่คนเดินผ่านแล้วต้องหันมอง", "Art Director / Key Visual Designer"],
    ],
  },
  IGD: {
    text: 'หัวหน้าสนามเกมเดินมาหา แล้วถามว่า <span class="whisper">"เกมของเธอจะเริ่มจากอะไร"</span>',
    options: [
      ["คิดกติกาและระบบให้คนเล่นแล้วติดใจ", "Game Designer / Level Designer"],
      ["ออกแบบฉากและตัวละครในเกม", "Game Artist"],
      ["สร้างโลกเสมือนที่เดินเข้าไปได้จริง", "VR / AR Designer"],
      ["ดูแลทีมให้เกมไปถึงมือผู้เล่นได้", "Game Producer"],
    ],
  },
  AFX: {
    text: 'ผู้กำกับลึกลับคนหนึ่งยื่นสคริปต์มาให้ แล้วถามว่า <span class="whisper">"เธออยากคุมฉากไหนของหนังเรื่องนี้"</span>',
    options: [
      ["ตัวละครที่ขยับเหมือนมีชีวิตจริง", "3D Animator / Rigging Artist"],
      ["ของและตัวละครที่ปั้นขึ้นมาจากความว่างเปล่า", "3D Modeler / Texture Artist"],
      ["ฉากระเบิด ไฟ น้ำ ควัน ที่ทำให้คนดูตกใจ", "VFX Artist"],
      ["การรวมทุกชั้นภาพให้ดูเหมือนถ่ายจริงชิ้นเดียว", "Compositor"],
    ],
  },
  DEN: {
    text: 'พิธีกรประจำเมืองยื่นไมค์มาให้ แล้วถามว่า <span class="whisper">"บทบาทไหนทำให้เธอใจเต้นแรงที่สุด"</span>',
    options: [
      ["คนคิดรายการและคอนเทนต์ที่ทุกคนรอดูทุกสัปดาห์", "Content Creator / Scriptwriter"],
      ["คนจัดงานที่ทำให้คนนับพันได้ประสบการณ์เดียวกัน", "Event / Show Producer"],
      ["คนเบื้องหลังตัวตนเสมือนและสตรีมเมอร์", "Virtual Talent / Streaming Producer"],
      ["คนที่ทำให้ชุมชนแฟนคลับเติบโต", "Entertainment Marketer / Community Manager"],
    ],
  },
};

/* ---------- 4. ฟอร์มบัตรผ่าน (ถามทีละข้อ ทุกข้อข้ามได้) ---------- */
// ชื่อเรียกถามแยกไว้ตั้งแต่ต้นเกม (หน้า "name") แล้วเอาไปใช้ในผลลัพธ์
// say: คำที่ดวงไฟพูด  {n} = ชื่อเรียกของผู้เล่น (ถ้าไม่บอกชื่อจะใช้คำว่า "เธอ")
const PROVINCES = ["กรุงเทพมหานคร", "กระบี่", "กาญจนบุรี", "กาฬสินธุ์", "กำแพงเพชร", "ขอนแก่น", "จันทบุรี", "ฉะเชิงเทรา", "ชลบุรี", "ชัยนาท", "ชัยภูมิ", "ชุมพร", "เชียงราย", "เชียงใหม่", "ตรัง", "ตราด", "ตาก", "นครนายก", "นครปฐม", "นครพนม", "นครราชสีมา", "นครศรีธรรมราช", "นครสวรรค์", "นนทบุรี", "นราธิวาส", "น่าน", "บึงกาฬ", "บุรีรัมย์", "ปทุมธานี", "ประจวบคีรีขันธ์", "ปราจีนบุรี", "ปัตตานี", "พระนครศรีอยุธยา", "พะเยา", "พังงา", "พัทลุง", "พิจิตร", "พิษณุโลก", "เพชรบุรี", "เพชรบูรณ์", "แพร่", "ภูเก็ต", "มหาสารคาม", "มุกดาหาร", "แม่ฮ่องสอน", "ยโสธร", "ยะลา", "ร้อยเอ็ด", "ระนอง", "ระยอง", "ราชบุรี", "ลพบุรี", "ลำปาง", "ลำพูน", "เลย", "ศรีสะเกษ", "สกลนคร", "สงขลา", "สตูล", "สมุทรปราการ", "สมุทรสงคราม", "สมุทรสาคร", "สระแก้ว", "สระบุรี", "สิงห์บุรี", "สุโขทัย", "สุพรรณบุรี", "สุราษฎร์ธานี", "สุรินทร์", "หนองคาย", "หนองบัวลำภู", "อ่างทอง", "อำนาจเจริญ", "อุดรธานี", "อุตรดิตถ์", "อุทัยธานี", "อุบลราชธานี", "ต่างประเทศ"];

const PASSPORT = [
  { id: "grade", label: "ตอนนี้เรียนอยู่ชั้นไหน", say: "{n}เรียนอยู่ชั้นไหนแล้วนะ?", type: "single", options: ["ม.4", "ม.5", "ม.6", "ปวช.", "ปวส.", "อื่น ๆ"] },
  { id: "track", label: "เรียนสายอะไรอยู่", say: "สายไหนเอ่ย?", type: "single", options: ["ศิลป์-คำนวณ", "ศิลป์-ภาษา", "วิทย์-คณิต", "สายอาชีพ", "อื่น ๆ"] },
  { id: "province", label: "อยู่จังหวัดอะไร", say: "บ้าน{n}อยู่ไหนน้า", type: "select", placeholder: "เลือกจังหวัด", options: PROVINCES },
  { id: "source", label: "รู้จักคณะนี้จากที่ไหน", say: "เจอพวกเราจากไหนเอ่ย?", type: "single", options: ["Facebook", "Instagram", "TikTok", "เพื่อนหรือรุ่นพี่", "ครูแนะแนว", "งานกิจกรรม", "อื่น ๆ"] },
  { id: "criteria", label: "เลือกคณะโดยดูจากอะไรมากที่สุด", hint: "เลือกได้ 2 ข้อ", say: "อะไรสำคัญที่สุดสำหรับ{n}?", type: "multi", max: 2, options: ["ค่าเทอม", "ทุนการศึกษา", "ชื่อเสียงมหาวิทยาลัย", "อาชีพหลังเรียนจบ", "ผลงานของรุ่นพี่", "การเดินทาง", "ความชอบของตัวเอง", "ผู้ปกครองสนับสนุน"] },
  { id: "stage", label: "ตอนนี้อยู่ขั้นไหนของการเลือกคณะ", say: "ไปถึงไหนแล้วน้า", type: "single", options: ["เพิ่งเริ่มหาข้อมูล", "กำลังเปรียบเทียบหลายที่", "ตั้งใจสมัครแล้ว", "รอผลสอบที่อื่นก่อน"] },
  { id: "works", label: "เคยทำงานสร้างสรรค์อะไรมาบ้าง", hint: "เลือกได้หลายข้อ", say: "เคยลองทำอะไรมาบ้าง?", type: "multi", options: ["วาดรูป", "ออกแบบ", "ตัดต่อวิดีโอ", "ทำเกม", "จัดกิจกรรม", "ถ่ายคอนเทนต์", "ยังไม่เคยเลย"] },
  { id: "contact", label: "อยากรับข่าวสารของคณะทางไหน", hint: "เลือกแล้วกรอกช่องติดต่อด้วยนะ", say: "ข้อสุดท้ายแล้ว!", type: "single", options: ["LINE", "อีเมล", "Facebook", "Instagram", "โทรศัพท์"] },
];

// ชื่อเรียกของผู้เล่น
const callName = () => state.nick || "เธอ";
const esc = t => String(t).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));

/* ---------- 5. ระบบคิดคะแนน ---------- */
const state = {};

function resetState() {
  state.scores = { DGA: 0, DGD: 0, IGD: 0, AFX: 0, DEN: 0 };
  state.answered = 0;          // ตอบฉากที่นับคะแนนไปแล้วกี่ฉาก
  state.answers = {};          // { "1.1": "DGA", ... }
  state.districts = [];        // ย่านที่ได้ไปในบทที่ 3
  state.careerPicks = {};      // { DGA: "Character Designer" }
  state.passport = {};
  state.nick = "";             // ชื่อเรียกที่ผู้เล่นตั้ง
  state.form = {};             // คำตอบบัตรผ่านระหว่างกรอก
  state.order = [];            // ลำดับสาขาที่ตอบ (ใช้เล่นเมโลดี้)
}

// เรียงสาขาจากคะแนนมากไปน้อย
// ถ้าคะแนนเท่ากัน: ให้สาขาที่เลือกในฉาก 5.2 ขึ้นก่อน (กติกาข้อ 4) แล้วค่อยเรียงตามลำดับในเอกสาร
function ranking() {
  const pick52 = state.answers["5.2"];
  return ORDER.slice().sort((a, b) =>
    (state.scores[b] - state.scores[a]) ||
    ((b === pick52) - (a === pick52)) ||
    (ORDER.indexOf(a) - ORDER.indexOf(b))
  );
}

// ย่านในบทที่ 3: คิดจากคะแนนหลังฉาก 2.3 (กติกาข้อ 5)
function pickDistricts() {
  const [first, second] = ranking();
  const list = [first];
  if (state.scores[first] - state.scores[second] <= CONFIG.DISTRICT_GAP) list.push(second);
  return list;
}

// ผลลัพธ์สุดท้าย (กติกาข้อ 2–4)
function computeResult() {
  const [first, second] = ranking();
  const mixed = state.scores[first] - state.scores[second] <= CONFIG.MIX_GAP;
  return { codes: mixed ? [first, second] : [first], mixed };
}

// อาชีพ: เอาที่เลือกในบทที่ 3 ขึ้นก่อน แล้วตามด้วยอาชีพอื่นของสาขาเดียวกัน (กติกาข้อ 6)
function careersFor(code) {
  const top = state.careerPicks[code];
  const rest = MAJORS[code].careers.filter(c => !top || !top.includes(c.split(" /")[0]));
  return { top, rest };
}

const shuffle = arr => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/* ---------- 6. ดวงไฟ (canvas particle) ---------- */
class Flame {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.particles = [];
    this.palette = [{ color: "#ffffff", weight: 1 }];
    this.size = 0.45;       // ขนาดตอนนี้
    this.targetSize = 0.45; // ขนาดที่กำลังโตไปหา
    this.boost = 0;         // พลังพิเศษตอนรับสี/ระเบิด
    this.time = 0;
    this.blink = 1;
    this.mood = "normal";
    this.look = { x: 0, y: 0 };      // ทิศที่ตามอง (-1..1)
    this.pointer = null;             // ตำแหน่งเมาส์/นิ้วล่าสุด
    this.tapAt = -10;                // เวลาที่ถูกแตะล่าสุด (ใช้ทำท่าเด้ง)
    this.onTap = null;
    this.resize();
    window.addEventListener("resize", () => this.resize());
    window.addEventListener("pointermove", e => { this.pointer = { x: e.clientX, y: e.clientY }; });
    canvas.addEventListener("pointerdown", e => {
      this.pointer = { x: e.clientX, y: e.clientY };
      this.tapAt = this.time;
      this.pulse(1.2);
      if (this.onTap) this.onTap();
    });
    requestAnimationFrame(t => this.loop(t));
  }

  setMood(mood) { this.mood = mood || "normal"; }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = this.canvas.clientWidth;
    this.h = this.canvas.clientHeight;
    this.canvas.width = this.w * dpr;
    this.canvas.height = this.h * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // รับคะแนนแล้วแปลงเป็นสีของไฟ (สีขาวจะค่อย ๆ หายไปเมื่อมีสีอื่นเข้ามา)
  setScores(scores, whiteWeight = 1) {
    this.palette = [{ color: "#ffffff", weight: whiteWeight }];
    ORDER.forEach(code => {
      if (scores[code] > 0) this.palette.push({ color: MAJORS[code].color, weight: scores[code] });
    });
  }

  setColors(colors) { // ใช้ตอนผลลัพธ์: ไฟเป็นสีของสาขานั้นล้วน ๆ
    this.palette = colors.map(c => ({ color: c, weight: 1 }));
  }

  grow(size) { this.targetSize = size; }
  pulse(power = 1) { this.boost = Math.max(this.boost, power); }

  pickColor() {
    const total = this.palette.reduce((s, p) => s + p.weight, 0);
    let r = Math.random() * total;
    for (const p of this.palette) { if ((r -= p.weight) <= 0) return p.color; }
    return this.palette[0].color;
  }

  // จุดศูนย์กลางฐานไฟ (ใช้บอกปลายทางของประกายสี)
  base() {
    const r = this.canvas.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height * 0.7 };
  }

  spawn(count) {
    const s = Math.min(this.w, this.h) * 0.22 * this.size;
    const cx = this.w / 2, by = this.h * 0.78;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: cx + (Math.random() - 0.5) * s * 1.1,
        y: by + (Math.random() - 0.5) * s * 0.3,
        vx: (Math.random() - 0.5) * (0.5 + this.boost * 3),
        vy: -(0.8 + Math.random() * 1.8) * (0.7 + this.size) * (1 + this.boost * 1.5),
        r: s * (0.35 + Math.random() * 0.4),
        life: 1,
        decay: 0.012 + Math.random() * 0.016,
        color: this.pickColor(),
        wob: Math.random() * Math.PI * 2,
      });
    }
  }

  loop(t) {
    const { ctx, w, h } = this;
    this.time = t / 1000;
    this.size += (this.targetSize - this.size) * 0.05;
    this.boost *= 0.95;

    ctx.clearRect(0, 0, w, h);
    this.spawn(Math.round(3 + this.size * 4 + this.boost * 10));

    // อนุภาคไฟ (ซ้อนแสงแบบ lighter ให้เรืองแสง)
    ctx.globalCompositeOperation = "lighter";
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx + Math.sin(this.time * 3 + p.wob) * 0.35;
      p.y += p.vy;
      p.life -= p.decay;
      p.r *= 0.985;
      if (p.life <= 0 || p.r < 0.5) { this.particles.splice(i, 1); continue; }
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      g.addColorStop(0, hexA(p.color, 0.55 * p.life));
      g.addColorStop(1, hexA(p.color, 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // แกนกลางของดวงไฟ + หน้าตา
    ctx.globalCompositeOperation = "source-over";
    const s = Math.min(w, h) * 0.22 * this.size;
    const cx = w / 2;
    const cy = h * 0.72 + Math.sin(this.time * 2) * 3;

    // ท่าเด้งตอนถูกแตะ: ยืด-หดแบบเยลลี่
    const dt = this.time - this.tapAt;
    const squash = dt < 1.2 ? Math.sin(dt * 18) * Math.exp(-dt * 4) * 0.22 : 0;
    const sx = 1 + squash, sy = 1 - squash;

    const main = this.palette[this.palette.length - 1].color;
    const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, s * 0.75);
    core.addColorStop(0, "rgba(255,255,255,1)");
    core.addColorStop(0.6, hexA(main, 0.9));
    core.addColorStop(1, hexA(main, 0));
    ctx.fillStyle = core;
    ctx.beginPath();
    ctx.ellipse(cx, cy, s * 0.75 * sx, s * 0.7 * sy, 0, 0, Math.PI * 2);
    ctx.fill();

    // ตามองตามเมาส์/นิ้ว
    if (this.pointer) {
      const r = this.canvas.getBoundingClientRect();
      const dx = this.pointer.x - (r.left + cx), dy = this.pointer.y - (r.top + cy);
      const len = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, len / 250);
      this.look.x += ((dx / len) * k - this.look.x) * 0.15;
      this.look.y += ((dy / len) * k - this.look.y) * 0.15;
    }

    // กะพริบตาทุก ๆ ไม่กี่วินาที
    const phase = this.time % 4;
    this.blink = phase > 3.85 ? 0.12 : 1;
    const mood = dt < 0.8 ? "happy" : this.mood; // ถูกแตะแล้วยิ้มแป๊บหนึ่ง
    drawFace(ctx, cx, cy, s * Math.min(sx, 1.1), mood, this.look, this.blink, this.time);

    requestAnimationFrame(t2 => this.loop(t2));
  }
}

/* หน้าตาดวงไฟ (ใช้ทั้งบนจอและบนการ์ดแชร์)
   ภายหลังถ้ากลุ่มวาดสีหน้าเอง เปลี่ยนส่วนนี้เป็นการวาดรูปแทนได้ */
function drawFace(ctx, cx, cy, s, mood, look, blink, time) {
  const ink = "#2a1640";
  const ex = s * 0.2, ey = cy - s * 0.06;
  const lx = look.x * s * 0.05, ly = look.y * s * 0.04;
  ctx.save();
  ctx.fillStyle = ink;
  ctx.strokeStyle = ink;
  ctx.lineCap = "round";
  ctx.lineWidth = Math.max(2, s * 0.045);

  const roundEyes = (rx, ry, shine) => {
    [-1, 1].forEach(side => {
      const x = cx + side * ex + lx, y = ey + ly;
      ctx.fillStyle = ink;
      ctx.beginPath();
      ctx.ellipse(x, y, rx, ry * blink, 0, 0, Math.PI * 2);
      ctx.fill();
      if (shine && blink > 0.5) {
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(x - rx * 0.3, y - ry * 0.35, rx * 0.38, 0, Math.PI * 2);
        ctx.fill();
        if (shine > 1) { ctx.beginPath(); ctx.arc(x + rx * 0.3, y + ry * 0.3, rx * 0.2, 0, Math.PI * 2); ctx.fill(); }
      }
    });
  };
  const blush = () => {
    ctx.fillStyle = "rgba(255,120,170,0.55)";
    [-1, 1].forEach(side => {
      ctx.beginPath();
      ctx.ellipse(cx + side * s * 0.36, ey + s * 0.17, s * 0.08, s * 0.045, 0, 0, Math.PI * 2);
      ctx.fill();
    });
  };
  const mouthArc = (y, r, down) => {
    ctx.beginPath();
    ctx.arc(cx, y, r, down ? Math.PI * 1.15 : Math.PI * 0.15, down ? Math.PI * 1.85 : Math.PI * 0.85);
    ctx.stroke();
  };

  switch (mood) {
    case "happy": // ตายิ้ม ^ ^
      [-1, 1].forEach(side => {
        ctx.beginPath();
        ctx.arc(cx + side * ex, ey + s * 0.03, s * 0.07, Math.PI * 1.15, Math.PI * 1.85);
        ctx.stroke();
      });
      blush();
      mouthArc(ey + s * 0.1, s * 0.09, false);
      break;
    case "sad": // ตาตก คิ้วเศร้า
      roundEyes(s * 0.055, s * 0.075, 1);
      [-1, 1].forEach(side => {
        ctx.beginPath();
        ctx.moveTo(cx + side * (ex - s * 0.08), ey - s * 0.15);
        ctx.lineTo(cx + side * (ex + s * 0.07), ey - s * 0.11);
        ctx.stroke();
      });
      mouthArc(ey + s * 0.24, s * 0.07, true);
      break;
    case "think": // มองขึ้นข้างบน ปากแบน
      roundEyes(s * 0.06, s * 0.09, 1);
      ctx.beginPath();
      ctx.moveTo(cx - s * 0.06, ey + s * 0.18);
      ctx.lineTo(cx + s * 0.08, ey + s * 0.16);
      ctx.stroke();
      // จุด ... ลอยข้างหัว
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      for (let i = 0; i < 3; i++) {
        const a = (Math.sin(time * 4 - i) + 1) / 2;
        ctx.globalAlpha = 0.4 + a * 0.6;
        ctx.beginPath();
        ctx.arc(cx + s * (0.75 + i * 0.18), cy - s * (0.55 + i * 0.12), s * (0.04 + i * 0.012), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      break;
    case "wow": // ตาโต ปากโอ
      roundEyes(s * 0.075, s * 0.1, 2);
      ctx.fillStyle = ink;
      ctx.beginPath();
      ctx.ellipse(cx, ey + s * 0.2, s * 0.045, s * 0.06, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    case "excited": // ตาวิ้ง ปากยิ้มกว้าง
      roundEyes(s * 0.07, s * 0.095, 2);
      blush();
      ctx.fillStyle = ink;
      ctx.beginPath();
      ctx.arc(cx, ey + s * 0.13, s * 0.08, 0, Math.PI);
      ctx.fill();
      break;
    default: // ปกติ
      roundEyes(s * 0.06, s * 0.09, 1);
      mouthArc(ey + s * 0.1, s * 0.06, false);
  }
  ctx.restore();
}

function hexA(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

/* ---------- 6.1 เสียง (สังเคราะห์ด้วย Web Audio ไม่ต้องใช้ไฟล์เสียง) ---------- */
// โน้ตประจำสาขา (บันไดเสียงเพนทาโทนิก ตอบครบแล้วได้เมโลดี้ของตัวเอง)
const NOTES = { DGA: 523.25, DGD: 587.33, IGD: 659.25, AFX: 783.99, DEN: 880.0 };

/* ---------- เพลงประจำตัวละคร ----------
   melody: [โน้ต (ครึ่งเสียงจาก root, null = เงียบ), ความยาว (จังหวะ)]
   แต่ละตัวต่างกันทั้งเครื่องดนตรี ความเร็ว จังหวะ และสเกล */
const THEMES = {
  // DGA นักเสกจินตนาการ: กล่องดนตรี จังหวะวอลทซ์ 3/4 ไต่ขึ้นเหมือนวาดฝัน
  DGA: { voice: "musicbox", bpm: 150, root: 523.25,
    melody: [[0,1],[4,1],[7,1],[12,2],[11,1],[9,1],[7,1],[4,1],[5,1],[9,1],[12,1],[14,2],[16,1],[19,3]],
    bass: [[0,0,3],[-3,3,3],[-7,6,3],[0,9,3],[0,12,3]] },
  // DGD นักออกแบบประจำเมือง: มาริมบา โน้ตเดินเป็นขั้นบันได สมมาตร เป็นระเบียบ
  DGD: { voice: "marimba", bpm: 128, root: 587.33,
    melody: [[0,.5],[2,.5],[4,.5],[7,.5],[4,.5],[2,.5],[0,1],[5,.5],[7,.5],[9,.5],[12,.5],[9,.5],[7,.5],[5,1],[7,.5],[9,.5],[11,.5],[14,.5],[12,2]],
    bass: [[0,0,2],[5,2,2],[7,4,2],[0,6,2]] },
  // IGD นักสร้างสนามเล่น: เสียงเกม 8 บิต เร็ว เด้ง ๆ จบด้วยเสียงเลเวลอัป
  IGD: { voice: "chip", bassVoice: "chipbass", bpm: 140, root: 659.25,
    melody: [[0,.25],[7,.25],[12,.25],[7,.25],[0,.25],[7,.25],[12,.25],[7,.25],[2,.25],[9,.25],[14,.25],[9,.25],[4,.25],[11,.25],[16,.5],[null,.25],[12,.25],[16,.25],[19,.25],[24,1.25]],
    bass: [[0,0,.5],[0,1,.5],[2,2,.5],[4,3,.5],[0,4,1]] },
  // AFX นักปั้นภาพให้มีชีวิต: เสียงเวทมนตร์ สเกลลิเดียน (มีโน้ตแปลกหูนิด ๆ) หมุนขึ้นแล้ววนลง
  AFX: { voice: "magic", bpm: 112, root: 523.25,
    melody: [[0,.5],[4,.5],[6,.5],[7,.5],[11,.5],[12,1],[14,.5],[12,.5],[11,.5],[7,.5],[6,.5],[4,1],[7,.5],[11,.5],[14,.5],[18,.5],[19,2.5]],
    bass: [[0,0,4],[2,4,2],[0,6,3]] },
  // DEN นักรวมใจคนทั้งเมือง: เพลงป๊อปบนเวที มีกลองกับเสียงตบมือ จบด้วยคอร์ดใหญ่
  DEN: { voice: "pluck", bpm: 122, root: 440,
    melody: [[7,.5],[null,.25],[7,.25],[9,.5],[7,.5],[12,.75],[null,.25],[11,.5],[9,.5],[7,1],[4,.5],[7,.5],[9,1],[12,1]],
    bass: [[0,0,1],[0,1.5,.5],[5,2,1],[5,3.5,.5],[7,4,1],[7,5.5,.5],[0,6,2]],
    drums: [["kick",0],["clap",1],["kick",2],["clap",3],["kick",4],["clap",5],["kick",6],["clap",7],["kick",7.5]],
    chord: [12,16,19,24] },
};

class Sound {
  constructor() {
    this.ctx = null;
    this.muted = false;
    try { this.muted = localStorage.getItem("ic-muted") === "1"; } catch (e) { /* ไม่มี storage ก็ไม่เป็นไร */ }
  }

  // ต้องเริ่มหลังผู้เล่นกดอะไรสักอย่าง (กฎของเบราว์เซอร์)
  init() {
    if (this.ctx) { if (this.ctx.state === "suspended") this.ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = this.ctx = new AC();
    this.master = ctx.createGain();
    this.master.gain.value = this.muted ? 0 : 0.8;
    this.master.connect(ctx.destination);
    // เสียงก้อง
    this.echo = ctx.createDelay();
    this.echo.delayTime.value = 0.24;
    const fb = ctx.createGain();
    fb.gain.value = 0.28;
    this.echo.connect(fb); fb.connect(this.echo);
    this.echo.connect(this.master);
    this.startAmbient();
  }

  setMuted(m) {
    this.muted = m;
    try { localStorage.setItem("ic-muted", m ? "1" : "0"); } catch (e) { /* ข้าม */ }
    if (this.ctx) this.master.gain.setTargetAtTime(m ? 0 : 0.8, this.ctx.currentTime, 0.05);
  }

  note(freq, { type = "triangle", dur = 0.7, vol = 0.22, when = 0, echo = true } = {}) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime + when;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(this.master);
    if (echo) g.connect(this.echo);
    o.start(t); o.stop(t + dur + 0.05);
  }

  chime(code) {
    const f = NOTES[code];
    this.note(f);
    this.note(f * 2, { type: "sine", vol: 0.07, dur: 0.5 });
  }

  melody(codes, gap = 0.2, when = 0) {
    codes.forEach((c, i) => this.note(NOTES[c], { when: when + i * gap, dur: 0.5, vol: 0.18 }));
  }

  /* ---------- เพลงประจำตัวละคร (แต่ละตัวไม่เหมือนกัน) ---------- */
  // เสียงเครื่องดนตรีแต่ละแบบ
  voice(kind, freq, t, dur) {
    const ctx = this.ctx;
    const out = (node, vol, echo = true) => {
      const g = ctx.createGain();
      node.connect(g); g.connect(this.master);
      if (echo) g.connect(this.echo);
      return g;
    };
    const env = (g, vol, attack, decay) => {
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + attack);
      g.gain.exponentialRampToValueAtTime(0.0001, t + decay);
    };
    const osc = (type, f) => { const o = ctx.createOscillator(); o.type = type; o.frequency.value = f; return o; };
    const go = (o, end) => { o.start(t); o.stop(t + end + 0.05); };

    if (kind === "musicbox") {            // DGA: กล่องดนตรี ใส ๆ ฝัน ๆ
      const o = osc("sine", freq), o2 = osc("sine", freq * 2);
      env(out(o, 0), 0.2, 0.005, dur * 2.6); env(out(o2, 0), 0.06, 0.005, dur * 1.4);
      go(o, dur * 2.6); go(o2, dur * 1.4);
    } else if (kind === "marimba") {      // DGD: มาริมบา เป็นระเบียบ เป๊ะ ๆ
      const o = osc("triangle", freq), o2 = osc("sine", freq * 4);
      env(out(o, 0, false), 0.26, 0.004, 0.42); env(out(o2, 0, false), 0.04, 0.002, 0.08);
      go(o, 0.42); go(o2, 0.08);
    } else if (kind === "chip") {         // IGD: เสียงเกม 8 บิต
      const o = osc("square", freq);
      const g = out(o, 0, false);
      g.gain.setValueAtTime(0.1, t); g.gain.setValueAtTime(0.0001, t + dur * 0.85);
      go(o, dur);
    } else if (kind === "chipbass") {
      const o = osc("triangle", freq);
      const g = out(o, 0, false);
      g.gain.setValueAtTime(0.16, t); g.gain.setValueAtTime(0.0001, t + dur * 0.9);
      go(o, dur);
    } else if (kind === "magic") {        // AFX: เสียงเวทมนตร์ เอื้อนขึ้น สั่นพริ้ว
      const o = osc("sine", freq), o2 = osc("triangle", freq * 1.5);
      o.frequency.setValueAtTime(freq * 0.94, t);
      o.frequency.exponentialRampToValueAtTime(freq, t + 0.08);
      const lfo = osc("sine", 6.5), depth = ctx.createGain();
      depth.gain.value = freq * 0.012; lfo.connect(depth); depth.connect(o.frequency);
      env(out(o, 0), 0.17, 0.04, dur * 1.8); env(out(o2, 0), 0.03, 0.06, dur * 1.2);
      go(o, dur * 1.8); go(o2, dur * 1.2); go(lfo, dur * 1.8);
    } else if (kind === "pluck") {        // DEN: เสียงป๊อปบนเวที
      const o = osc("sawtooth", freq), f = ctx.createBiquadFilter();
      f.type = "lowpass"; f.Q.value = 6;
      f.frequency.setValueAtTime(3200, t); f.frequency.exponentialRampToValueAtTime(500, t + 0.25);
      o.connect(f); env(out(f, 0), 0.12, 0.005, Math.max(0.3, dur));
      go(o, Math.max(0.3, dur));
    } else if (kind === "kick") {
      const o = osc("sine", 140);
      o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(45, t + 0.15);
      env(out(o, 0, false), 0.4, 0.003, 0.2); go(o, 0.2);
    } else if (kind === "clap") {
      const src = ctx.createBufferSource(); src.buffer = this.noiseBuffer(0.2);
      const f = ctx.createBiquadFilter(); f.type = "bandpass"; f.frequency.value = 1500; f.Q.value = 0.8;
      src.connect(f); env(out(f, 0, false), 0.18, 0.002, 0.14); src.start(t);
    } else if (kind === "bass") {
      const o = osc("sine", freq);
      env(out(o, 0, false), 0.16, 0.01, dur); go(o, dur);
    }
  }

  // เล่นเพลงประจำตัว คืนค่าความยาว (วินาที)
  theme(code, when = 0) {
    const th = THEMES[code];
    if (!this.ctx || !th) return 0;
    const beat = 60 / th.bpm;
    const t0 = this.ctx.currentTime + when;
    const hz = n => th.root * Math.pow(2, n / 12);
    let pos = 0;
    th.melody.forEach(([n, b]) => {
      if (n !== null) this.voice(th.voice, hz(n), t0 + pos * beat, b * beat);
      pos += b;
    });
    (th.bass || []).forEach(([n, at, b]) => this.voice(th.bassVoice || "bass", hz(n - 24), t0 + at * beat, b * beat));
    (th.drums || []).forEach(([kind, at]) => this.voice(kind, 0, t0 + at * beat, 0.2));
    (th.chord || []).forEach(n => this.voice(th.voice, hz(n), t0 + pos * beat, 1.2));
    return pos * beat + (th.chord ? 1.2 : 0.4);
  }

  // ผลผสม: เล่นเพลงตัวแรกแล้วต่อด้วยตัวที่สอง
  themes(codes, when = 0) {
    let at = when;
    codes.forEach(c => { at += this.theme(c, at) + 0.15; });
    return at - when;
  }

  noiseBuffer(dur) {
    const len = Math.floor(this.ctx.sampleRate * dur);
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  }

  // เสียงฟิ้ว ตอนประกายสีลอยเข้าไฟ
  whoosh(when = 0, dur = 0.5, from = 500, to = 2400, vol = 0.12) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime + when;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer(dur);
    const f = this.ctx.createBiquadFilter();
    f.type = "bandpass"; f.Q.value = 3;
    f.frequency.setValueAtTime(from, t);
    f.frequency.exponentialRampToValueAtTime(to, t + dur);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + dur * 0.3);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f); f.connect(g); g.connect(this.master);
    src.start(t);
  }

  // เสียงดึ๋ง ตอนแตะดวงไฟ
  boing() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(260, t);
    o.frequency.exponentialRampToValueAtTime(720, t + 0.12);
    o.frequency.exponentialRampToValueAtTime(420, t + 0.3);
    g.gain.setValueAtTime(0.25, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
    o.connect(g); g.connect(this.master);
    o.start(t); o.stop(t + 0.4);
  }

  // เสียงป๊อป ตอนของลงกระเป๋า
  pop() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.frequency.setValueAtTime(700, t);
    o.frequency.exponentialRampToValueAtTime(180, t + 0.1);
    g.gain.setValueAtTime(0.3, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
    o.connect(g); g.connect(this.master);
    o.start(t); o.stop(t + 0.15);
  }

  // เสียงไต่ระดับ ตอนเที่ยงคืน
  rise(dur = 1.4) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const f = this.ctx.createBiquadFilter();
    const g = this.ctx.createGain();
    o.type = "sawtooth";
    o.frequency.setValueAtTime(110, t);
    o.frequency.exponentialRampToValueAtTime(440, t + dur);
    f.type = "lowpass";
    f.frequency.setValueAtTime(300, t);
    f.frequency.exponentialRampToValueAtTime(3000, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.12, t + dur * 0.8);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.1);
    o.connect(f); f.connect(g); g.connect(this.master);
    o.start(t); o.stop(t + dur + 0.2);
  }

  // พลุ: ฟิ้วขึ้น แล้วตูม + เสียงแตกเปาะแปะ
  firework(when = 0) {
    if (!this.ctx) return;
    this.whoosh(when, 0.6, 300, 3000, 0.08);
    const t = this.ctx.currentTime + when + 0.6;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer(1.4);
    const f = this.ctx.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.setValueAtTime(2500, t);
    f.frequency.exponentialRampToValueAtTime(200, t + 1.2);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.4, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.3);
    src.connect(f); f.connect(g); g.connect(this.master);
    src.start(t);
    for (let i = 0; i < 14; i++) {
      this.note(2000 + Math.random() * 3000, { type: "square", dur: 0.03, vol: 0.03, when: when + 0.7 + Math.random() * 0.9, echo: false });
    }
  }

  // เสียงสีไหลหาย: โน้ตลดระดับลงเรื่อย ๆ
  drain(dur = 2.2) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const f = this.ctx.createBiquadFilter();
    const g = this.ctx.createGain();
    o.type = "triangle";
    o.frequency.setValueAtTime(880, t);
    o.frequency.exponentialRampToValueAtTime(110, t + dur);
    f.type = "lowpass";
    f.frequency.setValueAtTime(4000, t);
    f.frequency.exponentialRampToValueAtTime(250, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.16, t + 0.1);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(f); f.connect(g); g.connect(this.master); g.connect(this.echo);
    o.start(t); o.stop(t + dur + 0.1);
    [880, 784, 659, 523].forEach((fr, i) => this.note(fr, { type: "sine", vol: 0.08, dur: 0.6, when: i * 0.35 }));
  }

  // บรรยากาศกลางคืน: เสียงฮัมต่ำ ๆ + ดาวกระพริบเป็นโน้ตเบา ๆ
  startAmbient() {
    const ctx = this.ctx;
    const pad = ctx.createGain();
    pad.gain.value = 0.035;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass"; lp.frequency.value = 500;
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.08; lfoGain.gain.value = 250;
    lfo.connect(lfoGain); lfoGain.connect(lp.frequency);
    [130.81, 196.0, 261.63 * 1.003].forEach(f => {
      const o = ctx.createOscillator();
      o.type = "sawtooth"; o.frequency.value = f;
      o.connect(lp); o.start();
    });
    lp.connect(pad); pad.connect(this.master);
    lfo.start();
    const twinkle = () => {
      const keys = Object.values(NOTES);
      this.note(keys[Math.floor(Math.random() * keys.length)] * 2, { type: "sine", vol: 0.025, dur: 1.2 });
      setTimeout(twinkle, 2500 + Math.random() * 4000);
    };
    setTimeout(twinkle, 2000);
  }
}

/* ---------- 6.2 คำพูดของดวงไฟ ---------- */
const bubbleEl = document.getElementById("bubble");
let bubbleTimer;
function say(text, ms = 0) {
  clearTimeout(bubbleTimer);
  if (!text) { bubbleEl.classList.remove("is-on"); return; }
  bubbleEl.classList.remove("is-on");
  setTimeout(() => {
    bubbleEl.textContent = text;
    bubbleEl.classList.add("is-on");
  }, 120);
  if (ms) bubbleTimer = setTimeout(() => bubbleEl.classList.remove("is-on"), ms);
}

/* ---------- ผลลัพธ์แบบโปสเตอร์ (ตามตัวอย่างของอาจารย์) ---------- */
// คำคม / คำนิยาม 3 คำ / คำอธิบาย ของแต่ละผลลัพธ์
const POSTER = {
  DGA: {
    quote: "โลกธรรมดาจะพิเศษ เมื่อเรามองมันด้วยจินตนาการ",
    keywords: ["ช่างจินตนาการ", "ช่างสังเกต", "มีสไตล์"],
    desc: "เธอเห็นภาพในหัวก่อนใคร และถ่ายทอดความรู้สึกผ่านเส้นและสีได้ดีกว่าคำพูด จุดแข็งคือจินตนาการกว้างกับสายตาที่เก็บรายละเอียดเก่ง แต่บางครั้งก็จมอยู่กับรายละเอียดจนงานไม่จบ ลองปล่อยงานออกไปให้คนอื่นได้เห็นบ้างนะ",
  },
  DGD: {
    quote: "ความสวยที่ดีที่สุด คือความสวยที่ทุกคนเข้าใจ",
    keywords: ["จัดระเบียบเก่ง", "มีรสนิยม", "ใส่ใจคนอื่น"],
    desc: "เธอมองออกว่าอะไรควรอยู่ตรงไหน และทำเรื่องยากให้เข้าใจง่ายได้เสมอ จุดแข็งคือตาที่ดีเรื่องสี ตัวอักษร และการจัดวาง แต่ความอยากให้ทุกอย่างสมบูรณ์แบบ อาจทำให้แก้งานไม่รู้จบ บางครั้งดีพอก็ดีแล้วนะ",
  },
  IGD: {
    quote: "ทุกปัญหาคือด่าน และทุกด่านมีทางผ่าน",
    keywords: ["ช่างคิด", "ช่างทดลอง", "ขี้เล่น"],
    desc: "เธอชอบตั้งคำถามว่าสิ่งต่าง ๆ ทำงานยังไง และสนุกกับการลองผิดลองถูก จุดแข็งคือคิดเป็นขั้นตอนและทำให้เรื่องธรรมดากลายเป็นเรื่องสนุก แต่อาจเบื่อง่ายเมื่องานซ้ำ ๆ ลองหาความท้าทายเล็ก ๆ ซ่อนไว้ในทุกงานดูสิ",
  },
  AFX: {
    quote: "สิ่งที่เป็นไปไม่ได้ แค่ยังไม่มีใครทำให้มันขยับ",
    keywords: ["อดทน", "ละเอียด", "มุ่งมั่น"],
    desc: "เธอเชื่อว่าสิ่งยิ่งใหญ่เกิดจากความตั้งใจทีละนิด และมีความสุขที่สุดตอนเห็นภาพในหัวกลายเป็นจริง จุดแข็งคือความอดทนและสายตาที่ไวต่อการเคลื่อนไหวและแสง แต่บางครั้งทุ่มเทจนลืมพัก อย่าลืมดูแลตัวเองด้วยนะ",
  },
  DEN: {
    quote: "เวทีจะสนุกที่สุด เมื่อทุกคนได้ขึ้นไปด้วยกัน",
    keywords: ["เข้าใจคน", "กล้าแสดงออก", "พลังบวก"],
    desc: "เธอมีความสุขที่สุดตอนเห็นทุกคนสนุกไปด้วยกัน และเชื่อมคนเข้าหากันได้อย่างเป็นธรรมชาติ จุดแข็งคือการสื่อสารและพลังที่ทำให้ทีมอยากเดินต่อ แต่บางครั้งแคร์คนอื่นจนลืมตัวเอง อย่าลืมเก็บพลังไว้ให้ตัวเองบ้างนะ",
  },
};

// รวมข้อมูลโปสเตอร์ของผลลัพธ์ (รองรับผลลัพธ์ผสม)
function posterData() {
  const { codes, mixed } = computeResult();
  const [a, b] = codes;
  const title = mixed ? MIXED[pairKey(a, b)] : MAJORS[a].name;
  const keywords = mixed ? [...POSTER[a].keywords.slice(0, 2), POSTER[b].keywords[0]] : POSTER[a].keywords;
  const careers = [];
  codes.forEach(code => {
    const { top, rest } = careersFor(code);
    if (top) careers.push(top);
    careers.push(...rest.slice(0, mixed ? 2 : (top ? 4 : 5)));
  });
  return {
    codes, mixed, title,
    color: MAJORS[a].color,
    quote: POSTER[a].quote,
    keywords,
    descs: codes.map(c => POSTER[c].desc),
    careers: careers.slice(0, 5),
    majors: codes.map(c => MAJORS[c].major),
  };
}

/* ---------- 6.3 การ์ดแชร์ IG Story (1080 × 1920) ---------- */
async function makeShareCard(noImages = false) {
  const d = posterData();
  const W = 1080, H = 1920;
  const cv = document.createElement("canvas");
  cv.width = W; cv.height = H;
  const c = cv.getContext("2d");
  const deep = mix(d.color, "#2a1650", 0.38);

  // iPhone (Safari / เบราว์เซอร์ในแอป IG, LINE) จัดกึ่งกลางข้อความภาษาไทยบน canvas ไม่ได้
  // เลยคำนวณตำแหน่งกึ่งกลางเองแทน textAlign = "center"
  const rawFill = c.fillText.bind(c);
  c.fillText = (text, x, y, maxW) => {
    if (c.textAlign !== "center") return maxW ? rawFill(text, x, y, maxW) : rawFill(text, x, y);
    const w = Math.min(c.measureText(text).width, maxW || Infinity);
    c.textAlign = "left";
    if (maxW) rawFill(text, x - w / 2, y, maxW); else rawFill(text, x - w / 2, y);
    c.textAlign = "center";
  };

  try {
    await Promise.all([
      document.fonts.load('600 96px "Kodchasan"'),
      document.fonts.load('400 40px "Mali"'),
    ]);
  } catch (e) { /* โหลดฟอนต์ไม่ได้ก็ใช้ฟอนต์สำรอง */ }

  // พื้นหลังโปสเตอร์โทนสว่าง + แสงสีประจำสาขาที่มุม
  const bg = c.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#fffdf8");
  bg.addColorStop(0.55, "#fdfbff");
  bg.addColorStop(1, mix(d.color, "#ffffff", 0.86));
  c.fillStyle = bg;
  c.fillRect(0, 0, W, H);
  [[W * 0.86, 120, 620, 0.5], [W * 0.08, H - 160, 620, 0.4]].forEach(([x, y, r, a]) => {
    const g = c.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, hexA(d.color, a));
    g.addColorStop(1, hexA(d.color, 0));
    c.fillStyle = g;
    c.fillRect(0, 0, W, H);
  });

  c.textAlign = "center";
  let y = 190;
  const nick = state.nick;
  if (nick) {
    c.fillStyle = "#7a7090";
    c.font = '400 40px "Mali", sans-serif';
    c.fillText(`ไฟของ ${nick} คือ`, W / 2, y);
    y += 30;
  }

  // ชื่อผลลัพธ์
  c.fillStyle = deep;
  const t = fitLines(c, d.title, 920, 112, 72, 2, '600 {size}px "Kodchasan", sans-serif');
  y += t.size;
  t.lines.forEach(line => { c.fillText(line, W / 2, y); y += t.size * 1.18; });

  // ตัวละคร
  const imgs = noImages ? [] : (await Promise.all(d.codes.map(cd => loadImage(MAJORS[cd].image)))).filter(Boolean);
  const charTop = y - 10;
  if (imgs.length === 2) {
    const size = 420;
    c.drawImage(imgs[0], W / 2 - size + 30, charTop, size, size);
    c.drawImage(imgs[1], W / 2 - 30, charTop, size, size);
    y = charTop + size;
  } else if (imgs.length === 1) {
    const size = t.lines.length > 1 ? 460 : 520;
    c.drawImage(imgs[0], W / 2 - size / 2, charTop, size, size);
    y = charTop + size;
  } else {
    drawCardFlame(c, W / 2, charTop + 380, d.codes.map(cd => MAJORS[cd].color));
    y = charTop + 560;
  }

  // คำคม + คำนิยาม + เส้นคั่น
  y += 40;
  c.fillStyle = "#5d5470";
  const q = fitLines(c, `“${d.quote}”`, 900, 38, 30, 2, '400 {size}px "Mali", sans-serif');
  q.lines.forEach(line => { c.fillText(line, W / 2, y); y += q.size * 1.4; });
  y += 30;
  c.fillStyle = deep;
  c.font = '500 50px "Kodchasan", sans-serif';
  c.fillText(d.keywords.join(" · "), W / 2, y);
  y += 44;
  c.fillStyle = d.color;
  c.fillRect(W / 2 - 220, y, 440, 5);
  y += 70;

  // คำอธิบาย (การ์ดใช้ย่อหน้าแรก)
  c.fillStyle = "#6a6080";
  c.font = '400 34px "Mali", sans-serif';
  const all = wrapLines(c, d.descs[0], 880);
  // จำนวนบรรทัดคำอธิบาย: ให้เหลือที่พอสำหรับรายชื่ออาชีพ ไม่ทับท้ายการ์ด
  const careersH = 120 + d.careers.length * 44;
  const maxL = Math.max(2, Math.min(4, Math.floor((H - 150 - careersH - 20 - y) / 56)));
  const shown = all.slice(0, maxL);
  if (all.length > maxL) shown[maxL - 1] = shown[maxL - 1].replace(/\s*\S{0,3}$/, "") + "…";
  shown.forEach(line => { c.fillText(line, W / 2, y); y += 56; });

  // เส้นทางอาชีพ + รูปท่าที่ 2
  const by = y + 20;
  c.textAlign = "left";
  c.fillStyle = d.color;
  c.fillRect(110, by, 7, 70 + d.careers.length * 44);
  c.fillStyle = deep;
  c.font = '600 42px "Kodchasan", sans-serif';
  c.fillText("เส้นทางอาชีพที่เหมาะกับคุณ", 140, by + 44);
  c.fillStyle = "#5d5470";
  c.font = '400 32px "Mali", sans-serif';
  d.careers.forEach((job, i) => c.fillText(job, 140, by + 100 + i * 44, 560));

  // มุมขวาล่าง: ของติดตัวประจำสาขา (ผลผสมได้ 2 ชิ้น)
  if (!noImages) {
    const items = (await Promise.all(d.codes.map(code => loadImage(ITEMS[code].image)))).filter(Boolean);
    const pair = items.length > 1;
    const size = pair ? 190 : 230;
    const cy = by + careersH / 2;
    items.forEach((im, k) => {
      c.save();
      c.translate(W - 200 + (pair ? (k ? 60 : -60) : 0), cy + (pair ? (k ? 45 : -45) : 0));
      c.rotate(k ? 0.14 : -0.1);
      c.drawImage(im, -size / 2, -size / 2, size, size);
      c.restore();
    });
  }

  // ท้ายการ์ด
  c.textAlign = "center";
  c.fillStyle = deep;
  c.font = '500 30px "Kodchasan", sans-serif';
  c.fillText(`เรียนได้ที่ สาขา ${d.majors.join(" / ")}`, W / 2, H - 108, W - 140);
  c.fillStyle = "#7a7090";
  c.font = '400 28px "Mali", sans-serif';
  c.fillText(`School of Digital Media · ${CONFIG.HASHTAG}`, W / 2, H - 56);

  return cv;
}

// ตัดบรรทัดภาษาไทยตามความกว้าง
function wrapLines(c, text, maxW) {
  const words = TITLE_BREAKS[text] ? TITLE_BREAKS[text] : typeof Intl !== "undefined" && Intl.Segmenter
    ? [...new Intl.Segmenter("th", { granularity: "word" }).segment(text)].map(x => x.segment)
    : [...text];
  const lines = [];
  let cur = "";
  words.forEach(w => {
    if (c.measureText(cur + w).width > maxW && cur) { lines.push(cur.trim()); cur = w.trimStart(); }
    else cur += w;
  });
  if (cur.trim()) lines.push(cur.trim());
  return lines;
}

function drawCardFlame(c, cx, cy, colors) {
  c.save();
  c.globalCompositeOperation = "lighter";
  for (let i = 0; i < 260; i++) {
    const t = Math.random();
    const y = cy - t * 420;
    const spread = (1 - t) * 170 + 20;
    const x = cx + (Math.random() - 0.5) * spread * 2;
    const r = (1 - t) * 90 + 20;
    const col = colors[i % colors.length];
    const g = c.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, hexA(col, 0.22));
    g.addColorStop(1, hexA(col, 0));
    c.fillStyle = g;
    c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill();
  }
  c.restore();
  const s = 300;
  const core = c.createRadialGradient(cx, cy, 0, cx, cy, s * 0.75);
  core.addColorStop(0, "rgba(255,255,255,1)");
  core.addColorStop(0.6, hexA(colors[colors.length - 1], 0.95));
  core.addColorStop(1, hexA(colors[colors.length - 1], 0));
  c.fillStyle = core;
  c.beginPath(); c.ellipse(cx, cy, s * 0.75, s * 0.7, 0, 0, Math.PI * 2); c.fill();
  drawFace(c, cx, cy, s, "happy", { x: 0, y: 0 }, 1, 0);
}

function loadImage(src) {
  return new Promise(resolve => {
    const im = new Image();
    im.onload = () => resolve(im);
    im.onerror = () => resolve(null);
    im.src = src;
  });
}

function roundRect(c, x, y, w, h, r) {
  c.beginPath();
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
  c.fill();
}

// ตัดคำภาษาไทยให้พอดีความกว้าง (ลดขนาดตัวอักษรถ้ายาวเกิน)
function fitLines(c, text, maxW, startSize, minSize, maxLines, fontTpl) {
  const words = TITLE_BREAKS[text] ? TITLE_BREAKS[text] : typeof Intl !== "undefined" && Intl.Segmenter
    ? [...new Intl.Segmenter("th", { granularity: "word" }).segment(text)].map(s => s.segment)
    : [...text];
  for (let size = startSize; size >= minSize; size -= 4) {
    c.font = fontTpl.replace("{size}", size);
    const lines = [];
    let cur = "";
    words.forEach(w => {
      if (c.measureText(cur + w).width > maxW && cur) { lines.push(cur); cur = w.trimStart(); }
      else cur += w;
    });
    if (cur) lines.push(cur);
    if (lines.length <= maxLines) return { lines, size };
  }
  return { lines: [text], size: minSize };
}

async function openShareCard() {
  const btn = document.getElementById("shareBtn");
  if (btn) btn.textContent = "กำลังสร้างรูป…";
  let cv = await makeShareCard(), url;
  try {
    url = cv.toDataURL("image/png");
  } catch (e) {
    // เปิดไฟล์ตรง ๆ จากเครื่อง (file://) เบราว์เซอร์จะไม่ยอมให้ใช้รูปบนการ์ด เลยวาดดวงไฟแทน
    cv = await makeShareCard(true);
    url = cv.toDataURL("image/png");
  }
  document.getElementById("shareImg").src = url;
  document.getElementById("shareDownload").href = url;
  document.getElementById("shareModal").hidden = false;
  if (btn) btn.innerHTML = `${ICONS.download} บันทึกรูปภาพ`;

  // ปุ่มแชร์ของมือถือ (ถ้าเครื่องรองรับ)
  const nativeBtn = document.getElementById("shareNative");
  cv.toBlob(blob => {
    if (!blob) return;
    const file = new File([blob], "imagine-city-card.png", { type: "image/png" });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      nativeBtn.hidden = false;
      nativeBtn.onclick = () => navigator.share({ files: [file], title: "Imagine City" }).catch(() => {});
    }
  });
}

/* ---------- 7. โลกด้านหลัง ---------- */
// ฉากหลังเป็นภาพที่กลุ่มวาด (images/bg.webp)
// เลื่อนเมาส์/เอียงนิ้วแล้วภาพขยับตามเล็กน้อย ให้ดูมีมิติ (parallax)
function buildWorld() {
  const bg = document.getElementById("worldBg");
  if (!bg || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  window.addEventListener("pointermove", e => {
    const x = (e.clientX / window.innerWidth - 0.5) * -24;
    const y = (e.clientY / window.innerHeight - 0.5) * -14;
    bg.style.transform = `translate(${x}px, ${y}px)`;
  });
}

function mix(a, b, t) {
  const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
  const ch = sh => Math.round(((pa >> sh) & 255) * (1 - t) + ((pb >> sh) & 255) * t);
  return `rgb(${ch(16)},${ch(8)},${ch(0)})`;
}

// 0 = เทาทั้งหมด, 1 = สีเต็ม
function setColorAmount(amount) {
  document.documentElement.style.setProperty("--gray", (1 - amount).toFixed(3));
}

function updateHud() {
  const mins = state.answered * CONFIG.MINUTES_PER_SCENE;
  const done = state.answered >= SCORED_TOTAL && current >= flow.findIndex(s => s.type === "midnight");
  const hh = done ? 0 : CONFIG.START_HOUR + Math.floor(mins / 60);
  const mm = done ? 0 : mins % 60;
  document.getElementById("clock").textContent =
    `${String(hh % 24).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
  document.getElementById("progressBar").style.width = (state.answered / SCORED_TOTAL * 100) + "%";
  if (DEBUG) {
    document.getElementById("debug").textContent =
      ORDER.map(c => `${c}: ${state.scores[c]}`).join("\n") + `\nตอบแล้ว: ${state.answered}/${SCORED_TOTAL}`;
  }
}

/* ---------- 8. หน้าจอแต่ละแบบ ---------- */
const panel = document.getElementById("panel");
let flame;

// เปลี่ยนเนื้อหาในกล่อง พร้อมแอนิเมชัน
function render(html, after) {
  panel.classList.remove("is-entering");
  panel.classList.add("is-leaving");
  setTimeout(() => {
    panel.innerHTML = html;
    panel.classList.remove("is-leaving");
    panel.classList.add("is-entering");
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (after) after();
  }, panel.innerHTML ? 350 : 0);
}

/* ไอคอน (เส้นแบบ Lucide) ใช้แทน emoji */
const ICONS = {
  external: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
  download: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  music: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
  backpack: '<svg class="ico ico--lg" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><path d="M8 10h8"/><path d="M8 18h8"/><path d="M8 22v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>',
  volume: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>',
  mute: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/></svg>',
};

// ปุ่ม "แตะเพื่อไปต่อ" (Ghost Button) + แตะตรงไหนของจอก็ไปต่อได้
const TAP_NEXT = `<button class="btn btn--ghost tap-next" data-next>แตะเพื่อไปต่อ</button>`;
let tapAnywhere = false;
function enableTapAnywhere() {
  tapAnywhere = false;
  setTimeout(() => { tapAnywhere = true; }, 700); // กันกดเบิ้ลจากหน้าก่อนหน้า
}

const SCREENS = {
  intro() {
    flame.setMood("wow");
    say("อ๊ะ! สีหายไปหมดแล้ว!");
    render(`
      <p class="eyebrow">23:00 · คืนสุดท้าย</p>
      <h2 class="title">สีกำลังหายไป…</h2>
      <p class="story">แสงสีทั้งเมืองค่อย ๆ จางลงจนเหลือแต่สีเทา ทันใดนั้น ดวงไฟดวงเล็ก ๆ ก็ลอยลงมาหยุดตรงหน้าเธอ</p>
      ${TAP_NEXT}
    `, enableTapAnywhere);
  },

  prologue() {
    flame.setMood("think");
    say("คืนนี้คืนเดียวเท่านั้นนะ");
    render(`
      <p class="story">Imagine City เคยเต็มไปด้วยภาพวาด ป้ายไฟ เสียงเพลง และเกม แต่ตอนนี้ทุกอย่างซีดเป็นสีเทา เหลือเวลาอีกแค่คืนเดียวก่อนสีจะหายไปตลอดกาล</p>
      <p class="story">ถ้ามีใครขึ้นเวทีในเทศกาล Imagine Design Event แล้วทำให้คนทั้งเมืองกลับมายิ้มได้ สีทั้งหมดก็จะกลับมา</p>
      <p class="story">ดวงไฟบอกว่าจะนำทางให้ แต่เธอต้องเป็นคนตัดสินใจเองทุกอย่าง</p>
      ${TAP_NEXT}
    `, enableTapAnywhere);
  },

  chapter(step) {
    const ch = CHAPTERS[step.ch];
    flame.pulse(0.6);
    flame.setMood(ch.mood);
    say(ch.say);
    render(`
      <h2 class="title">${ch.title}</h2>
      <p class="story">${ch.text}</p>
      ${TAP_NEXT}
    `, enableTapAnywhere);
  },

  scene(step) {
    const sc = SCENES[step.id];
    const options = shuffle(ORDER); // สุ่มลำดับตัวเลือกทุกครั้ง (กติกาข้อ 7)
    flame.setMood(sc.mood);
    say(sc.say);
    if (sc.interaction === "drag") return renderDragScene(step.id, sc, options);
    render(`
      <h2 class="h2">${sc.title}</h2>
      <p class="story">${sc.text}</p>
      <div class="choices">
        ${options.map(code => `<button class="choice" data-code="${code}">${sc.choices[code]}</button>`).join("")}
      </div>
    `, () => {
      panel.querySelectorAll(".choice").forEach(btn =>
        btn.addEventListener("click", () => answerScene(step.id, btn))
      );
    });
  },

  district(step) {
    const d = DISTRICTS[step.code];
    const m = MAJORS[step.code];
    const options = shuffle(d.options.map((o, i) => i));
    flame.setMood("happy");
    say("ที่นี่แหละ ที่ของเธอ");
    render(`
      <h2 class="h2">${m.district}</h2>
      <p class="story">${d.text}</p>
      <div class="choices">
        ${options.map(i => `<button class="choice" data-i="${i}">${d.options[i][0]}</button>`).join("")}
      </div>
    `, () => {
      panel.querySelectorAll(".choice").forEach(btn =>
        btn.addEventListener("click", () => {
          state.careerPicks[step.code] = d.options[+btn.dataset.i][1];
          lockAndGo(btn, m.color, false);
        })
      );
    });
  },

  // หน้าตั้งชื่อเรียก (หลังบทนำ ก่อนบทที่ 1)
  name() {
    flame.setMood("happy");
    say("ให้ฉันเรียกเธอว่าอะไรดี?");
    render(`
      <h2 class="h2">ก่อนออกเดินทาง…</h2>
      <p class="story">ดวงไฟลอยเข้ามาใกล้ ๆ อยากรู้ว่าจะเรียกเธอว่าอะไรดี</p>
      <form class="name-form" id="nameForm" autocomplete="off">
        <input class="input input--name" id="nameInput" maxlength="16" placeholder="ชื่อเรียกของเธอ" enterkeyhint="go" value="${esc(state.nick)}">
        <div class="btn-stack">
          <button class="btn btn--primary" type="submit">ไปกันเลย</button>
          <button class="btn btn--ghost" type="button" id="nameSkip">ไม่บอกดีกว่า</button>
        </div>
      </form>
    `, setupName);
  },

  passport() {
    state.form = {};
    passportStep(0);
  },

  midnight() {
    state.answered = SCORED_TOTAL;
    updateHud();
    const { codes } = computeResult();
    flame.setMood("wow");
    say(state.nick ? `ตีสิบสองแล้ว ${state.nick}!` : "ตีสิบสองแล้ว!");
    sound.rise(1.3);
    sound.firework(0.7);
    sound.themes(codes, 1.9); // เพลงประจำตัวละครที่ได้
    render(`
      <h2 class="title">ตีสิบสองแล้ว…</h2>
      <p class="story">ดวงไฟในมือเธอสว่างวาบ สีทั้งหมดที่เธอเก็บมาตลอดทางกำลังรวมเป็นหนึ่งเดียว</p>
    `, () => {
      flame.grow(1.25);
      flame.pulse(2);
      setTimeout(() => {
        flame.setColors(codes.map(c => MAJORS[c].color));
        flame.pulse(3);
        setColorAmount(1);
      }, 1200);
      setTimeout(next, 3200);
    });
  },

  result() {
    const d = posterData();
    const nick = state.nick;
    flame.setMood("excited");
    say(nick ? `นี่แหละ ตัวตนของ${nick}!` : "นี่แหละ ตัวตนของเธอ!");

    // มุมขวาล่าง: ของติดตัวประจำสาขา (ผลผสมได้ 2 ชิ้น)
    const items = d.codes.map(c => `<img class="poster__item" src="${ITEMS[c].image}" alt="${ITEMS[c].name}">`).join("");
    const main = d.codes.map(c => `<img class="poster__char" src="${MAJORS[c].image}" alt="ตัวละคร ${MAJORS[c].name}">`).join("");

    render(`
      <article class="poster" style="--c:${d.color}">
        ${nick ? `<p class="poster__nick">ไฟของ ${esc(nick)} คือ</p>` : ""}
        <h2 class="poster__title">${titleHTML(d.title)}</h2>
        <div class="poster__chars${d.mixed ? " is-pair" : ""}">${main}</div>
        <p class="poster__quote">“${d.quote}”</p>
        <p class="poster__keys">${d.keywords.join(" · ")}</p>
        <hr class="poster__line">
        ${d.descs.map(t => `<p class="poster__desc">${t}</p>`).join("")}
        <div class="poster__bottom">
          <div class="poster__careers">
            <h3>เส้นทางอาชีพที่เหมาะกับคุณ</h3>
            <ul>${d.careers.map(c => `<li>${c}</li>`).join("")}</ul>
            <p class="poster__major">เรียนได้ที่ สาขา ${d.majors.join(" / ")}</p>
          </div>
          <div class="poster__items${d.codes.length > 1 ? " is-pair" : ""}">${items}</div>
        </div>
      </article>

      <div class="btn-stack">
        <button class="btn btn--primary" id="shareBtn">${ICONS.download} บันทึกรูปภาพ</button>
        <button class="btn btn--outline" id="melodyBtn">${ICONS.music} ฟังเมโลดี้ไฟของฉัน</button>
        <button class="btn btn--ghost" id="restart">เล่นอีกครั้ง</button>
      </div>
      <p class="result__news">ติดตามข่าวสาร กิจกรรม และข้อมูลทุนการศึกษาจาก School of Digital Media<br>
        <span class="result__links">
          <a class="link" href="${CONFIG.SUBSCRIBE_URL}" target="_blank" rel="noopener">สมัครรับข่าวสาร</a>
          <span class="result__dot" aria-hidden="true">·</span>
          <a class="link" href="${CONFIG.UNI_URL}" target="_blank" rel="noopener">ดูข้อมูลมหาวิทยาลัย</a>
        </span></p>
    `, () => {
      document.getElementById("restart").addEventListener("click", showCover);
      document.getElementById("shareBtn").addEventListener("click", openShareCard);
      const melodyBtn = document.getElementById("melodyBtn");
      melodyBtn.addEventListener("click", () => {
        if (melodyBtn.disabled) return;
        sound.init();
        const len = sound.themes(posterData().codes);
        flame.pulse(1.5);
        // กันกดซ้ำระหว่างเพลงยังเล่นอยู่
        melodyBtn.disabled = true;
        setTimeout(() => { melodyBtn.disabled = false; }, Math.max(800, len * 1000));
      });
      panel.querySelectorAll(".poster__item").forEach(im => im.addEventListener("error", () => im.remove()));
      panel.querySelectorAll(".poster__char").forEach(im => {
        im.addEventListener("error", () => im.remove());
        im.addEventListener("click", () => {
          sound.init(); sound.boing();
          im.classList.remove("is-boing"); void im.offsetWidth; im.classList.add("is-boing");
        });
      });
    });
  },
};

// ตอบคำถามที่นับคะแนน
function answerScene(id, btn, wait) {
  const code = btn.dataset.code;
  state.scores[code] += 1;
  state.answers[id] = code;
  state.answered += 1;
  state.order.push(code);
  sound.chime(code);
  lockAndGo(btn, MAJORS[code].color, true, wait);
}

// ล็อกปุ่ม ส่งประกายสีเข้าไฟ แล้วไปฉากถัดไป
function lockAndGo(btn, color, scored, wait = 1100) {
  btn.closest(".choices, .items").classList.add("is-locked");
  sound.whoosh(0.05, 0.6);
  btn.classList.add("is-picked");
  btn.style.setProperty("--pick", color);

  const from = btn.getBoundingClientRect();
  const to = flame.base();
  const spark = document.createElement("div");
  spark.className = "spark";
  spark.style.left = from.left + from.width / 2 + "px";
  spark.style.top = from.top + from.height / 2 + "px";
  spark.style.background = color;
  spark.style.color = color;
  document.body.appendChild(spark);
  requestAnimationFrame(() => requestAnimationFrame(() => {
    spark.style.transform =
      `translate(${to.x - from.left - from.width / 2}px, ${to.y - from.top - from.height / 2}px) scale(0.4)`;
    spark.style.opacity = "0.2";
  }));

  setTimeout(() => {
    spark.remove();
    if (scored) {
      const progress = state.answered / SCORED_TOTAL;
      flame.setScores(state.scores, Math.max(0.2, 2 - state.answered * 0.25));
      flame.grow(0.45 + progress * 0.6);
      setColorAmount(progress * 0.75); // เมืองได้สีกลับมาทีละนิด (เต็มตอนเที่ยงคืน)
      updateHud();
    }
    flame.pulse(1);
  }, 700);

  setTimeout(next, wait);
}

/* ฉากเลือกของติดตัว (ฉาก 1.2)
   โชว์แค่รูปของ 5 ชิ้น ยังไม่บอกความหมาย พอเลือกแล้วค่อยเฉลยว่าของชิ้นนั้นคืออะไร
   ลากของไปวางที่กระเป๋า หรือแตะที่ของ ของก็จะลอยเข้ากระเป๋าเอง */
function renderDragScene(id, sc, options) {
  render(`
    <h2 class="h2">${sc.title}</h2>
    <p class="story">${sc.text}</p>
    <div class="items">
      ${options.map(code => `
        <button class="item" data-code="${code}" type="button" aria-label="${ITEMS[code].name}">
          <img class="item__img" src="${ITEMS[code].image}" alt="" draggable="false">
          <span class="item__name">${ITEMS[code].name}</span>
        </button>`).join("")}
    </div>
    <div class="bag" id="bag">${ICONS.backpack}<span id="bagText">ลากของมาใส่กระเป๋าตรงนี้</span></div>
  `, () => {
    const bag = document.getElementById("bag");
    let done = false;

    // ยังไม่มีรูปที่วาด: โชว์ชื่อของสั้น ๆ แทน (ยังไม่บอกความหมาย)
    panel.querySelectorAll(".item__img").forEach(img =>
      img.addEventListener("error", () => img.closest(".item").classList.add("no-img")));

    const overBag = (x, y) => {
      const r = bag.getBoundingClientRect();
      return x > r.left && x < r.right && y > r.top && y < r.bottom;
    };

    const pick = item => {
      if (done) return;
      done = true;
      const code = item.dataset.code;
      sound.pop();
      bag.classList.add("is-full");
      bag.style.setProperty("--pick", MAJORS[code].color);
      // เฉลยความหมายของของที่เลือก
      document.getElementById("bagText").innerHTML = `เธอเลือก <b>${sc.choices[code]}</b>`;
      // ของลงกระเป๋าแล้ว: ค่อย ๆ หายไป ไม่บังข้อความเฉลย
      setTimeout(() => { item.style.transition = "opacity 0.35s ease, transform 0.35s ease"; item.style.opacity = "0"; }, 750);
      answerScene(id, item, 2600);
    };

    panel.querySelectorAll(".item").forEach(item => {
      let start = null, dragging = false;

      item.addEventListener("pointerdown", e => {
        if (done) return;
        sound.init();
        start = { x: e.clientX, y: e.clientY };
        dragging = false;
        item.setPointerCapture(e.pointerId);
      });

      item.addEventListener("pointermove", e => {
        if (!start || done) return;
        const dx = e.clientX - start.x, dy = e.clientY - start.y;
        if (!dragging && Math.hypot(dx, dy) > 6) { dragging = true; item.classList.add("is-dragging"); }
        if (dragging) {
          item.style.transform = `translate(${dx}px, ${dy}px) rotate(${dx * 0.03}deg)`;
          bag.classList.toggle("is-over", overBag(e.clientX, e.clientY));
        }
      });

      item.addEventListener("pointerup", e => {
        if (!start || done) return;
        start = null;
        bag.classList.remove("is-over");
        if (dragging && overBag(e.clientX, e.clientY)) {
          item.classList.remove("is-dragging");
          pick(item);
        } else if (dragging) { // ปล่อยนอกกระเป๋า: เด้งกลับที่เดิม
          item.classList.remove("is-dragging");
          item.classList.add("is-returning");
          item.style.transform = "";
          setTimeout(() => item.classList.remove("is-returning"), 350);
        } else { // แตะเฉย ๆ: ของลอยเข้ากระเป๋าเอง
          const a = item.getBoundingClientRect(), b = bag.getBoundingClientRect();
          item.classList.add("is-flying");
          item.style.transform =
            `translate(${b.left + b.width / 2 - a.left - a.width / 2}px, ${b.top + b.height / 2 - a.top - a.height / 2}px) scale(0.6)`;
          setTimeout(() => pick(item), 450);
        }
      });

      item.addEventListener("pointercancel", () => {
        start = null;
        item.classList.remove("is-dragging");
        item.style.transform = "";
      });
    });
  });
}

function setupName() {
  const form = document.getElementById("nameForm");
  const input = document.getElementById("nameInput");
  let done = false;
  const go = nick => {
    if (done) return;
    done = true;
    state.nick = nick;
    sound.init();
    sound.pop();
    flame.setMood("excited");
    flame.pulse(1);
    say(nick ? `ยินดีที่ได้รู้จักนะ ${nick}!` : "ไม่เป็นไร ไปกันเลย!");
    setTimeout(next, 1300);
  };
  form.addEventListener("submit", e => { e.preventDefault(); go(input.value.trim().slice(0, 16)); });
  document.getElementById("nameSkip").addEventListener("click", () => go(""));
  input.addEventListener("input", () => {
    // ดวงไฟทำหน้าตื่นเต้นตอนกำลังพิมพ์
    flame.setMood(input.value.trim() ? "wow" : "happy");
  });
  if (matchMedia("(hover: hover)").matches) setTimeout(() => input.focus(), 400);
}

// ช่องพิมพ์เพิ่มเติม: เลือก "อื่น ๆ" หรือเลือกช่องทางติดต่อแล้ว ช่องนี้จะโผล่มา
const CONTACT_INPUT = {
  "LINE": { placeholder: "LINE ID ของเธอ", type: "text" },
  "อีเมล": { placeholder: "อีเมลของเธอ", type: "email" },
  "Facebook": { placeholder: "ชื่อหรือลิงก์ Facebook", type: "text" },
  "Instagram": { placeholder: "@ชื่อ Instagram", type: "text" },
  "โทรศัพท์": { placeholder: "เบอร์โทรศัพท์", type: "tel" },
};

// แสดงบัตรผ่านทีละข้อ
function passportStep(i) {
  const f = PASSPORT[i];
  const total = PASSPORT.length;
  const last = i === total - 1;
  const saved = state.form[f.id] || { picked: [], extra: "" };
  flame.setMood("happy");
  say(f.say.replace("{n}", callName()));

  const dots = PASSPORT.map((_, k) =>
    `<span class="q-dot${k < i ? " is-done" : k === i ? " is-now" : ""}"></span>`).join("");

  let body;
  if (f.type === "select") {
    body = `<select class="input select" name="${f.id}">
        <option value="">${f.placeholder}</option>
        ${f.options.map(o => `<option${saved.picked[0] === o ? " selected" : ""}>${o}</option>`).join("")}
      </select>`;
  } else {
    body = `<div class="chips" data-id="${f.id}" data-type="${f.type}" data-max="${f.max || 99}">
        ${f.options.map(o => `<button type="button" class="chip${saved.picked.includes(o) ? " is-on" : ""}">${o}</button>`).join("")}
      </div>
      <input class="input input--extra" name="extra" autocomplete="off" value="${esc(saved.extra)}" hidden>`;
  }

  render(`
    <p class="eyebrow">บัตรผ่านนักเดินทาง</p>
    <div class="q-dots" role="img" aria-label="ข้อ ${i + 1} จาก ${total}">${dots}</div>
    ${i === 0 ? `<p class="q-note">ก่อนขึ้นเวที ผู้เฝ้าประตูขอถามนิดหน่อย ตอบเท่าที่สะดวก ข้อไหนไม่อยากตอบก็ข้ามได้</p>` : ""}
    <h2 class="h2 q-title">${f.label}</h2>
    ${f.hint ? `<p class="field__hint">${f.hint}</p>` : ""}
    <div class="field q-field">${body}</div>
    <div class="btn-stack">
      <button class="btn btn--primary" id="qNext" type="button">${last ? "ยื่นบัตรผ่าน" : "ต่อไป"}</button>
      <div class="q-nav">
        ${i > 0 ? `<button class="q-link" id="qBack" type="button">ย้อนกลับ</button>` : ""}
        <button class="q-link" id="qSkip" type="button">${last ? "ข้ามแล้วไปดูผล" : "ข้ามข้อนี้"}</button>
        ${i === 0 ? `<button class="q-link" id="qSkipAll" type="button">ข้ามทั้งหมด</button>` : ""}
      </div>
    </div>
  `, () => setupQuestion(i));
}

function setupQuestion(i) {
  const f = PASSPORT[i];
  const last = i === PASSPORT.length - 1;
  const nextBtn = document.getElementById("qNext");
  const extra = panel.querySelector('[name="extra"]');
  const group = panel.querySelector(".chips");
  const select = panel.querySelector("select");
  let leaving = false;

  const read = () => {
    if (select) return { picked: select.value ? [select.value] : [], extra: "" };
    return {
      picked: [...group.querySelectorAll(".chip.is-on")].map(c => c.textContent),
      extra: extra && !extra.hidden ? extra.value.trim() : "",
    };
  };
  const hasAnswer = () => read().picked.length > 0;

  // ปุ่ม "ต่อไป" สว่างขึ้นเมื่อตอบแล้ว (แต่ยังกดได้ตลอด เพราะข้ามได้)
  const refresh = () => {
    nextBtn.classList.toggle("is-dim", !hasAnswer());
    if (!group || !extra) return;
    const on = read().picked;
    if (f.id === "contact" && on.length) {
      const cfg = CONTACT_INPUT[on[0]];
      extra.type = cfg.type;
      extra.placeholder = cfg.placeholder;
      extra.hidden = false;
    } else if (on.includes("อื่น ๆ")) {
      extra.type = "text";
      extra.placeholder = "พิมพ์คำตอบของเธอ";
      extra.hidden = false;
    } else {
      extra.hidden = true;
      extra.value = "";
    }
  };

  const go = (dir, keep = true) => {
    if (leaving) return;
    leaving = true;
    if (keep) state.form[f.id] = read();
    else delete state.form[f.id];
    if (dir < 0) return passportStep(i - 1);
    if (last) return submitPassport();
    passportStep(i + 1);
  };

  if (group) {
    const multi = group.dataset.type === "multi";
    const max = +group.dataset.max;
    group.querySelectorAll(".chip").forEach(chip => chip.addEventListener("click", () => {
      if (leaving) return;
      if (!multi) {
        const was = chip.classList.contains("is-on");
        group.querySelectorAll(".chip").forEach(c => c.classList.remove("is-on"));
        if (!was) chip.classList.add("is-on");
      } else {
        const on = group.querySelectorAll(".chip.is-on").length;
        if (chip.classList.contains("is-on")) chip.classList.remove("is-on");
        else if (on < max) chip.classList.add("is-on");
        else { sound.boing(); return; }
      }
      sound.pop();
      refresh();
      if (extra && !extra.hidden) { extra.focus(); return; }
      // ข้อที่เลือกได้ข้อเดียว: กดแล้วไปข้อถัดไปเองเลย
      if (!multi && !last && chip.classList.contains("is-on")) setTimeout(() => go(1), 380);
    }));
  }
  if (select) select.addEventListener("change", () => { refresh(); if (select.value) setTimeout(() => go(1), 380); });
  if (extra) extra.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); go(1); } });

  nextBtn.addEventListener("click", () => go(1));
  document.getElementById("qSkip").addEventListener("click", () => go(1, false));
  document.getElementById("qBack")?.addEventListener("click", () => go(-1));
  document.getElementById("qSkipAll")?.addEventListener("click", () => {
    if (leaving) return;
    leaving = true;
    state.form = {};
    submitPassport();
  });
  refresh();
}

// รวมคำตอบทั้งหมดเป็นข้อมูลบัตรผ่าน
function submitPassport() {
  const data = {};
  if (state.nick) data.nickname = state.nick;
  PASSPORT.forEach(f => {
    const a = state.form[f.id];
    if (!a || !a.picked.length) return;
    if (f.id === "contact") { data.contact = { channel: a.picked[0], value: a.extra }; return; }
    // แทนคำว่า "อื่น ๆ" ด้วยคำตอบที่พิมพ์
    const picked = a.picked.map(p => (p === "อื่น ๆ" && a.extra ? `อื่น ๆ: ${a.extra}` : p));
    data[f.id] = f.type === "multi" ? picked : picked[0];
  });
  state.passport = data;
  // TODO: ส่งข้อมูลไปเก็บ เช่น Google Sheets (ต้องทำ backend หรือใช้ Apps Script)
  console.log("บัตรผ่าน:", data, "คะแนน:", state.scores);
  next();
}

/* ---------- 9. ตัวควบคุมลำดับเกม ---------- */
let flow = [];
let current = -1;
const DEBUG = new URLSearchParams(location.search).has("debug");

function buildFlow() {
  return [
    { type: "intro" },
    { type: "prologue" },
    { type: "name" },          // ตั้งชื่อเรียก
    { type: "chapter", ch: 1 },
    { type: "scene", id: "1.1" }, { type: "scene", id: "1.2" }, { type: "scene", id: "1.3" },
    { type: "chapter", ch: 2 },
    { type: "scene", id: "2.1" }, { type: "scene", id: "2.2" }, { type: "scene", id: "2.3" },
    { type: "districts" },     // จะถูกแทนที่ด้วยบทที่ 3 ตามคะแนนตอนถึงจุดนี้
    { type: "scene", id: "gate" },
    { type: "chapter", ch: 4 },
    { type: "scene", id: "4.1" }, { type: "scene", id: "4.2" },
    { type: "chapter", ch: 5 },
    { type: "scene", id: "5.1" }, { type: "scene", id: "5.2" },
    { type: "passport" },
    { type: "midnight" },
    { type: "result" },
  ];
}

function next() {
  current += 1;
  let step = flow[current];

  if (step.type === "districts") {
    state.districts = pickDistricts();
    const steps = [{ type: "chapter", ch: 3 }, ...state.districts.map(code => ({ type: "district", code }))];
    flow.splice(current, 1, ...steps);
    step = flow[current];
  }

  document.getElementById("hud").classList.toggle("is-visible", !["intro", "prologue", "name", "result"].includes(step.type));
  SCREENS[step.type](step);
}

function start() {
  resetState();
  flow = buildFlow();
  current = -1;
  setColorAmount(0);
  flame.setScores(state.scores);
  flame.grow(0.45);
  updateHud();
  next();
}

/* ---------- หน้าปก ---------- */
const coverEl = document.getElementById("cover");

// ตัวละครบนหน้าปก: เงาไฟ 5 สี มีเครื่องหมาย ? (ยังไม่เฉลยว่าเป็นตัวไหน)
function buildCover() {
  const title = document.getElementById("coverTitle");
  title.innerHTML = [...title.textContent].map((ch, i) =>
    ch === " " ? `<span class="space"> </span>`
      : `<span style="animation-delay:${0.15 + i * 0.06}s, ${i * 0.12}s">${ch}</span>`).join("");

  const row = document.getElementById("coverChars");
  row.innerHTML = "";
  ["DGA", "DGD", "IGD", "AFX", "DEN"].forEach((code, i) => {
    const m = MAJORS[code];
    const box = document.createElement("div");
    box.className = "cover__char";
    box.title = "???";
    box.style.animationDelay = `${1.2 + i * 0.12}s, ${-i * 0.6}s`;
    const ghost = `<div class="cover__ghost"><svg viewBox="0 0 100 100" aria-hidden="true">
        <path d="M50 6 C62 26 82 36 80 62 C78 84 64 94 50 94 C36 94 22 84 20 62 C19 44 34 38 38 22 C44 30 46 18 50 6 Z" fill="${m.color}" opacity=".85"/>
      </svg><b>?</b></div>`;
    // หน้าปกโชว์แค่เงาไฟ + ? ทุกดวง เก็บหน้าตาตัวละครไว้ให้ลุ้นตอนผลลัพธ์
    box.innerHTML = ghost;
    box.addEventListener("click", () => {
      sound.init();
      sound.chime(code);
      box.animate([{ scale: 1 }, { scale: 1.25 }, { scale: 0.95 }, { scale: 1 }], { duration: 450, easing: "ease-out" });
    });
    row.appendChild(box);
  });
}

function showCover() {
  document.body.classList.add("on-cover");
  coverEl.hidden = false;
  coverEl.classList.remove("is-leaving");
  document.getElementById("world").classList.remove("is-draining");
  setColorAmount(1); // หน้าปก: เมืองยังมีสีครบ
  say("");
  buildCover();
}

// กดเริ่ม: สีไหลหายไปจากเมือง แล้วเข้าสู่เกม
document.getElementById("coverStart").addEventListener("click", () => {
  sound.init();
  sound.drain();
  const world = document.getElementById("world");
  world.classList.add("is-draining");
  coverEl.classList.add("is-leaving");
  setColorAmount(0);
  setTimeout(() => {
    coverEl.hidden = true;
    document.body.classList.remove("on-cover");
    world.classList.remove("is-draining");
    start();
  }, 2300);
});

// ปุ่มที่มี data-next กดแล้วไปต่อ
panel.addEventListener("click", e => {
  if (e.target.closest("[data-next]")) { tapAnywhere = false; sound.init(); next(); }
});
// แตะที่ว่างตรงไหนก็ได้ เพื่อไปต่อ (เฉพาะหน้าที่เป็นเรื่องเล่า)
document.addEventListener("click", e => {
  if (!tapAnywhere || document.body.classList.contains("on-cover")) return;
  if (e.target.closest("button, a, input, select, form, .modal, #flame")) return;
  tapAnywhere = false;
  sound.init();
  next();
});
document.addEventListener("keydown", e => {
  if (tapAnywhere && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); tapAnywhere = false; next(); }
});

// เริ่มเกม
const sound = new Sound();
buildWorld();
flame = new Flame(document.getElementById("flame"));

// แตะดวงไฟ: เด้งดึ๋ง + พูดอะไรสักอย่าง
flame.onTap = () => {
  sound.init();
  sound.boing();
  say(TAP_LINES[Math.floor(Math.random() * TAP_LINES.length)], 1800);
};

// เสียงเริ่มทำงานหลังผู้เล่นแตะหน้าจอครั้งแรก
window.addEventListener("pointerdown", () => sound.init(), { once: true });

// ปุ่มเปิด/ปิดเสียง
const muteBtn = document.getElementById("muteBtn");
const paintMute = () => {
  muteBtn.innerHTML = sound.muted ? ICONS.mute : ICONS.volume;
  muteBtn.setAttribute("aria-label", sound.muted ? "เปิดเสียง" : "ปิดเสียง");
};
muteBtn.addEventListener("click", () => { sound.init(); sound.setMuted(!sound.muted); paintMute(); });
paintMute();

// ปิดหน้าต่างการ์ดแชร์
document.getElementById("shareClose").addEventListener("click", () => {
  document.getElementById("shareModal").hidden = true;
});

if (DEBUG) document.getElementById("debug").hidden = false;
showCover();
