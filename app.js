const CATALOG = [
  { id: "SR1", name: "บ้านตัวอย่างหนองขาม", type: "บ้านเดี่ยว", province: "ชลบุรี", district: "ศรีราชา", sub: "หนองขาม", area: 66.7, unit: "ตร.ว.", price: 2800000, promo: true, project: "ตัวอย่างลัดดา" },
  { id: "SR2", name: "บ้านตัวอย่างบางพระ", type: "บ้านเดี่ยว", province: "ชลบุรี", district: "ศรีราชา", sub: "บางพระ", area: 50, unit: "ตร.ว.", price: 1900000, promo: false, project: "ตัวอย่างบางพระ" },
  { id: "SR3", name: "บ้านตัวอย่างบ่อวิน", type: "บ้านเดี่ยว", province: "ชลบุรี", district: "ศรีราชา", sub: "บ่อวิน", area: 78, unit: "ตร.ว.", price: 3050000, promo: true, project: "ตัวอย่างบ่อวิน" },
  { id: "SR4", name: "บ้านตัวอย่างสุรศักดิ์", type: "บ้านเดี่ยว", province: "ชลบุรี", district: "ศรีราชา", sub: "สุรศักดิ์", area: 40, unit: "ตร.ว.", price: 1450000, promo: false, project: "ตัวอย่างสุรศักดิ์" },
  { id: "SR5", name: "ทาวน์เฮ้าส์ตัวอย่างศรีราชา", type: "ทาวน์เฮ้าส์", province: "ชลบุรี", district: "ศรีราชา", sub: "หนองขาม", area: 22, unit: "ตร.ว.", price: 1590000, promo: true, project: "ตัวอย่างทาวน์" },
  { id: "BN1", name: "คอนโดตัวอย่างบางนา", type: "คอนโด", province: "กรุงเทพมหานคร", district: "บางนา", sub: "บางนา", area: 32, unit: "ตร.ม.", price: 1360000, promo: false, project: "ตัวอย่างบางนา" },
  { id: "BN2", name: "คอนโดตัวอย่างบางนาเหนือ", type: "คอนโด", province: "กรุงเทพมหานคร", district: "บางนา", sub: "บางนาเหนือ", area: 28, unit: "ตร.ม.", price: 1490000, promo: true, project: "ตัวอย่างเรสสิเดนซ์" },
  { id: "PK", name: "คอนโดตัวอย่างพระโขนง", type: "คอนโด", province: "กรุงเทพมหานคร", district: "พระโขนง", sub: "บางจาก", area: 35, unit: "ตร.ม.", price: 1890000, promo: false, project: "ตัวอย่างพระโขนง" },
  { id: "PT1", name: "ทาวน์เฮ้าส์ตัวอย่างรังสิต", type: "ทาวน์เฮ้าส์", province: "ปทุมธานี", district: "ธัญบุรี", sub: "ประชาธิปัตย์", area: 21, unit: "ตร.ว.", price: 1150000, promo: true, project: "ตัวอย่างรังสิต" },
  { id: "PT2", name: "ทาวน์เฮ้าส์ตัวอย่างลำลูกกา", type: "ทาวน์เฮ้าส์", province: "ปทุมธานี", district: "ลำลูกกา", sub: "บึงคำพร้อย", area: 18, unit: "ตร.ว.", price: 890000, promo: false, project: "ตัวอย่างลำลูกกา" },
  { id: "PT3", name: "บ้านเดี่ยวตัวอย่างปทุมธานี", type: "บ้านเดี่ยว", province: "ปทุมธานี", district: "ธัญบุรี", sub: "ประชาธิปัตย์", area: 55, unit: "ตร.ว.", price: 2400000, promo: false, project: "ตัวอย่างธัญบุรี" }
];

const GEO = {
  "ชลบุรี": { "ศรีราชา": ["หนองขาม", "บางพระ", "บ่อวิน", "สุรศักดิ์"] },
  "กรุงเทพมหานคร": { "บางนา": ["บางนา", "บางนาเหนือ"], "พระโขนง": ["บางจาก"] },
  "ปทุมธานี": { "ธัญบุรี": ["ประชาธิปัตย์"], "ลำลูกกา": ["บึงคำพร้อย"] }
};

const PRESETS = {
  sri: { type: "บ้านเดี่ยว", province: "ชลบุรี", district: "ศรีราชา", sub: "หนองขาม", budget: 3000000, area: 60, keyword: "", weights: [35, 25, 20, 10, 10] },
  bangna: { type: "คอนโด", province: "กรุงเทพมหานคร", district: "บางนา", sub: "", budget: 1500000, area: 30, keyword: "", weights: [35, 25, 20, 10, 10] },
  rangsit: { type: "ทาวน์เฮ้าส์", province: "ปทุมธานี", district: "ธัญบุรี", sub: "ประชาธิปัตย์", budget: 1200000, area: 20, keyword: "รังสิต", weights: [35, 25, 20, 10, 10] }
};

const $ = (id) => document.getElementById(id);

function money(n) {
  return (n / 1e6).toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " ล้านบาท";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function fillSelect(select, values, selected, placeholder) {
  const options = [];
  if (placeholder) options.push(`<option value="">${placeholder}</option>`);
  values.forEach((value) => {
    options.push(`<option value="${escapeHtml(value)}"${value === selected ? " selected" : ""}>${escapeHtml(value)}</option>`);
  });
  select.innerHTML = options.join("");
}

function syncGeo(preset) {
  const province = preset ? preset.province : $("province").value;
  const district = preset ? preset.district : $("district").value;
  const sub = preset ? preset.sub : $("sub").value;
  fillSelect($("province"), Object.keys(GEO), province);
  const districts = Object.keys(GEO[province] || {});
  const nextDistrict = districts.includes(district) ? district : districts[0];
  fillSelect($("district"), districts, nextDistrict);
  const subs = (GEO[province] && GEO[province][nextDistrict]) || [];
  fillSelect($("sub"), subs, subs.includes(sub) ? sub : "", "ไม่ระบุตำบล");
}

function readQuery() {
  const weights = ["w-price", "w-area", "w-loc", "w-promo", "w-text"].map((id) => Number($(id).value));
  return {
    type: $("type").value,
    province: $("province").value,
    district: $("district").value,
    sub: $("sub").value,
    budget: Number($("budget").value),
    area: Number($("area").value),
    keyword: $("keyword").value.trim(),
    weights
  };
}

function scoreCatalog(query) {
  const cap = query.budget * 1.05;
  const minArea = query.area * 0.7;
  const labels = ["งบ", "พื้นที่", "ทำเล", "โปรโมชั่น", "คำค้น"];
  const passed = [];
  const rejected = [];

  CATALOG.forEach((home) => {
    if (home.type !== query.type) {
      rejected.push({ home, reason: "ประเภทไม่ตรง" });
      return;
    }
    if (home.province !== query.province) {
      rejected.push({ home, reason: "คนละจังหวัด" });
      return;
    }
    if (home.district !== query.district) {
      rejected.push({ home, reason: "คนละอำเภอ" });
      return;
    }
    if (home.price > cap) {
      rejected.push({ home, reason: "ราคาเกินงบที่เผื่อ 5%" });
      return;
    }
    if (home.area < minArea) {
      rejected.push({ home, reason: "พื้นที่ต่ำกว่า 70% ของที่อยากได้" });
      return;
    }

    const priceFit = Math.max(0, Math.min(1, 1 - Math.abs(home.price - query.budget) / query.budget));
    const areaFit = Math.max(0, Math.min(1, 1 - Math.abs(home.area - query.area) / query.area));
    const loc = query.sub ? (home.sub === query.sub ? 1 : 0.7) : 1;
    const promo = home.promo ? 1 : 0;
    const values = [priceFit, areaFit, loc, promo];
    const used = labels.slice(0, 4).map((label, index) => ({ label, value: values[index], weight: query.weights[index] }));

    if (query.keyword) {
      const blob = `${home.name} ${home.project}`.toLowerCase();
      used.push({ label: "คำค้น", value: blob.includes(query.keyword.toLowerCase()) ? 1 : 0, weight: query.weights[4] });
    }

    const weightSum = used.reduce((sum, part) => sum + part.weight, 0);
    if (weightSum <= 0) {
      rejected.push({ home, reason: "ยังไม่ได้ให้น้ำหนัก" });
      return;
    }
    const score = used.reduce((sum, part) => sum + (part.weight / weightSum) * part.value, 0);
    passed.push({ home, score, parts: used, weightSum });
  });

  passed.sort((a, b) => b.score - a.score);
  return { passed: passed.slice(0, 5), rejected, cap, minArea };
}

function locPhrase(query, home) {
  if (!query.sub || home.sub === query.sub) return "ทำเลตรงตามที่ระบุ";
  return `อยู่ตำบล${home.sub} ในอำเภอที่ระบุ แต่ไม่ตรงตำบล${query.sub}`;
}

function render() {
  const query = readQuery();
  $("budget-out").textContent = money(query.budget);
  $("area-out").textContent = query.area.toLocaleString("th-TH");
  $("area-unit").textContent = query.type === "คอนโด" ? "ตัวเลขนี้เทียบเป็นตารางเมตรกับคอนโด" : "ตัวเลขนี้เทียบเป็นตารางวากับบ้านและที่ดิน";
  const weightSum = query.weights.reduce((sum, value) => sum + value, 0);
  $("weight-sum").textContent = String(weightSum);

  const { passed, rejected, cap, minArea } = scoreCatalog(query);
  $("gate").textContent = `เพดานราคา ${money(cap)} · พื้นที่อย่างน้อย ${minArea.toLocaleString("th-TH", { maximumFractionDigits: 1 })} · ผ่านเกณฑ์ ${passed.length} จาก ${CATALOG.length} หลังในกล่องนี้`;

  if (!passed.length) {
    $("results").innerHTML = `<p class="explain">ไม่มีทรัพย์ตัวอย่างผ่านเกณฑ์ ลองขยับงบ พื้นที่ หรืออำเภอ</p>`;
  } else {
    $("results").innerHTML = passed.map((item, index) => {
      const bars = item.parts.map((part) => {
        const pct = Math.round(part.value * 100);
        return `<div class="bar-row"><span>${escapeHtml(part.label)}</span><div class="track"><span style="width:${pct}%"></span></div><span>${pct}%</span></div>`;
      }).join("");
      const promo = item.home.promo ? "อยู่ในโปรโมชั่น" : "ไม่ได้ติดโปรโมชั่น";
      const sentence = `${item.home.name} ได้ ${Math.round(item.score * 100)} คะแนน จากราคา ${money(item.home.price)} พื้นที่ ${item.home.area} ${item.home.unit} ${locPhrase(query, item.home)} และ${promo} ราคาที่แสดงมาจากรายการตัวอย่าง ไม่ได้ให้โมเดลแต่งขึ้น`;
      return `<article class="result">
        <header>
          <div>
            <h3>อันดับ ${index + 1} · ${escapeHtml(item.home.name)}</h3>
            <p class="meta">${escapeHtml(item.home.type)} · ${escapeHtml(item.home.sub)} ${escapeHtml(item.home.district)} ${escapeHtml(item.home.province)} · ${escapeHtml(item.home.project)}</p>
          </div>
          <div class="score">${Math.round(item.score * 100)}</div>
        </header>
        <p class="meta">${money(item.home.price)} · ${item.home.area} ${item.home.unit}${item.home.promo ? " · โปรโมชั่น" : ""}</p>
        ${bars}
        <p class="explain">${escapeHtml(sentence)}</p>
      </article>`;
    }).join("");
  }

  const grouped = {};
  rejected.forEach((item) => {
    grouped[item.reason] = grouped[item.reason] || [];
    grouped[item.reason].push(item.home.name);
  });
  $("rejected").innerHTML = Object.entries(grouped).map(([reason, names]) => {
    return `<div>${escapeHtml(reason)}: ${escapeHtml(names.join(", "))}</div>`;
  }).join("");
}

function applyPreset(key) {
  const preset = PRESETS[key];
  $("type").value = preset.type;
  $("budget").value = String(preset.budget);
  $("area").value = String(preset.area);
  $("keyword").value = preset.keyword;
  ["w-price", "w-area", "w-loc", "w-promo", "w-text"].forEach((id, index) => {
    $(id).value = String(preset.weights[index]);
  });
  syncGeo(preset);
  document.querySelectorAll("[data-preset]").forEach((button) => {
    button.setAttribute("aria-pressed", button.dataset.preset === key ? "true" : "false");
  });
  render();
}

document.querySelectorAll("[data-preset]").forEach((button) => {
  button.addEventListener("click", () => applyPreset(button.dataset.preset));
});

["type", "province", "district", "sub", "budget", "area", "keyword", "w-price", "w-area", "w-loc", "w-promo", "w-text"].forEach((id) => {
  $(id).addEventListener("input", () => {
    if (id === "province" || id === "district") syncGeo();
    document.querySelectorAll("[data-preset]").forEach((button) => button.setAttribute("aria-pressed", "false"));
    render();
  });
});

applyPreset("sri");
