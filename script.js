function analyzeURL() {
    let url = document.getElementById("urlInput").value.toLowerCase();

    let score = 0;
    let reasons = [];

    // 🔒 HTTPS check
    if (!url.startsWith("https")) {
        score += 40;
        reasons.push("❌ No HTTPS encryption detected");
    } else {
        reasons.push("✔ HTTPS encryption found");
    }

    // ⚠️ Suspicious keywords
    let badWords = ["login", "verify", "secure", "bank", "update", "password"];

    badWords.forEach(word => {
        if (url.includes(word)) {
            score += 15;
            reasons.push("⚠ Suspicious keyword found: " + word);
        }
    });

    // 🌐 Fake domain patterns
    if (url.includes("-")) {
        score += 10;
        reasons.push("⚠ Hyphen detected in domain (common in phishing sites)");
    }

    if (url.includes(".xyz") || url.includes(".top")) {
        score += 25;
        reasons.push("🚨 Suspicious domain extension detected");
    }

    // 📏 Length check
    if (url.length > 70) {
        score += 10;
        reasons.push("⚠ Unusually long URL detected");
    }

    // 🧠 Final Decision
    let status = "";
    if (score < 30) {
        status = "🟢 SAFE WEBSITE";
    } else if (score < 70) {
        status = "🟡 SUSPICIOUS WEBSITE";
    } else {
        status = "🔴 PHISHING WEBSITE DETECTED";
    }

    // 📊 Output UI
    document.getElementById("resultBox").innerHTML = `
        <h2>${status}</h2>
        <p><b>Risk Score:</b> ${score}/100</p>
        <h3>Analysis Report:</h3>
        <ul>
            ${reasons.map(r => `<li>${r}</li>`).join("")}
        </ul>
    `;
}