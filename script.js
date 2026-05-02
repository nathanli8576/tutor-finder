// ==========================================
// TUTOR DATABASE (Your Mini-Database)
// ==========================================
// To add a new tutor, just copy one of these blocks and change the details.
// Everything between { } is one tutor.

const tutors = [
    {
        id: 1,
        name: "陳小明",
        verified: true,
        university: "香港大學",
        major: "醫學系",
        year: "Year 2",
        secondarySchool: "皇仁書院",
        grades: [
            { subject: "English", grade: "5**" },
            { subject: "Maths", grade: "5*" },
            { subject: "Chemistry", grade: "5*" },
            { subject: "Biology", grade: "5" }
        ],
        subjectsOffered: [
            { subject: "English", level: "F.4-F.6", price: 200 },
            { subject: "English", level: "F.1-F.3", price: 160 },
            { subject: "Biology", level: "F.4-F.6", price: 180 }
        ],
        bio: "兩年補習經驗，專攻DSE英文作文及閱讀理解。提供自製筆記及練習。",
        phone: "61234567"
    },
    {
        id: 2,
        name: "張家希",
        verified: false,
        university: "香港科技大學",
        major: "工程系",
        year: "Year 3",
        secondarySchool: "喇沙書院",
        grades: [
            { subject: "Maths", grade: "5*" },
            { subject: "M2", grade: "5*" },
            { subject: "Physics", grade: "5" }
        ],
        subjectsOffered: [
            { subject: "Maths", level: "F.4-F.6", price: 180 },
            { subject: "Maths", level: "P.5-P.6", price: 140 },
            { subject: "M2", level: "F.4-F.6", price: 200 }
        ],
        bio: "擅長講解抽象數學概念，幫助學生由淺入深理解M2微積分。",
        phone: "69876543"
    },
    {
        id: 3,
        name: "李詠詩",
        verified: true,
        university: "香港中文大學",
        major: "中文系",
        year: "Year 1",
        secondarySchool: "聖保祿學校",
        grades: [
            { subject: "Chinese", grade: "5**" },
            { subject: "Chinese History", grade: "5*" },
            { subject: "English", grade: "5" }
        ],
        subjectsOffered: [
            { subject: "Chinese", level: "F.4-F.6", price: 180 },
            { subject: "Chinese", level: "P.5-P.6", price: 130 },
            { subject: "Chinese History", level: "F.4-F.6", price: 170 }
        ],
        bio: "2025 DSE中文5**，熟讀十二篇指定文言篇章，提供星級範文分析。",
        phone: "65551234"
    }
];

// ==========================================
// FUNCTION: Show Contact Number
// ==========================================
function revealContact(phoneNumber, buttonElement) {
    buttonElement.outerHTML = '<span class="phone">📱 WhatsApp: ' + phoneNumber + '</span>';
}

// ==========================================
// FUNCTION: Create One Tutor Card (HTML)
// ==========================================
function createTutorCard(tutor) {
    // Build the verified badge if needed
    let verifiedBadge = '';
    if (tutor.verified) {
        verifiedBadge = '<span class="verified">✅ 成績認證</span>';
    }

    // Build the grade tags
    let gradeTags = '';
    for (let g of tutor.grades) {
        gradeTags += '<span class="grade-tag">' + g.subject + ' ' + g.grade + '</span>';
    }

    // Build the subjects/prices text
    let subjectsText = '';
    for (let s of tutor.subjectsOffered) {
        subjectsText += s.subject + ' (' + s.level + ') $' + s.price + '/hr<br>';
    }

    // Put the whole card together
    let cardHTML = `
        <div class="tutor-card" 
             data-name="${tutor.name.toLowerCase()}" 
             data-subjects="${tutor.subjectsOffered.map(s => s.subject.toLowerCase()).join(',')}" 
             data-levels="${tutor.subjectsOffered.map(s => s.level.toLowerCase()).join(',')}" 
             data-price="${Math.min(...tutor.subjectsOffered.map(s => s.price))}">
            <h3>${tutor.name} ${verifiedBadge}</h3>
            <p class="school">🎓 ${tutor.university} · ${tutor.major} ${tutor.year} | 🏫 ${tutor.secondarySchool}</p>
            <div class="grades">${gradeTags}</div>
            <p class="price">💰 ${subjectsText}</p>
            <p class="bio">${tutor.bio}</p>
            <button class="contact-btn" onclick="revealContact('${tutor.phone}', this)">📞 顯示聯絡方式</button>
        </div>
    `;

    return cardHTML;
}

// ==========================================
// FUNCTION: Display All Tutors
// ==========================================
function displayTutors(tutorArray) {
    const container = document.getElementById('tutor-list');
    container.innerHTML = ''; // Clear existing cards

    for (let tutor of tutorArray) {
        container.innerHTML += createTutorCard(tutor);
    }
}

// ==========================================
// FUNCTION: Filter Tutors
// ==========================================
function filterTutors() {
    // Get values from search inputs
    const searchText = document.getElementById('search-text').value.toLowerCase().trim();
    const levelFilter = document.getElementById('filter-level').value;
    const maxPrice = document.getElementById('filter-price').value;

    // Subject name mapping (English <-> Chinese)
    const subjectMap = {
        'english': ['english', '英文', '英語'],
        '英文': ['english', '英文', '英語'],
        '英語': ['english', '英文', '英語'],
        'maths': ['maths', 'math', '數學'],
        'math': ['maths', 'math', '數學', 'm2'],
        '數學': ['maths', 'math', '數學', 'm2'],
        'm2': ['m2', '數學', 'maths', 'math'],
        'chinese': ['chinese', '中文'],
        '中文': ['chinese', '中文', 'chinese history', '中國歷史'],
        'chemistry': ['chemistry', '化學'],
        '化學': ['chemistry', '化學'],
        'chemistry': ['chemistry', '化學'],
        'biology': ['biology', '生物'],
        '生物': ['biology', '生物'],
        'physics': ['physics', '物理'],
        '物理': ['physics', '物理'],
        'chinese history': ['chinese history', '中國歷史', '中史'],
        '中國歷史': ['chinese history', '中國歷史', '中史'],
        '中史': ['chinese history', '中國歷史', '中史'],
        'econ': ['econ', 'economics', '經濟'],
        'economics': ['econ', 'economics', '經濟'],
        '經濟': ['econ', 'economics', '經濟'],
        '通識': ['通識', 'liberal studies', 'ls'],
        'liberal studies': ['通識', 'liberal studies', 'ls'],
        'ls': ['通識', 'liberal studies', 'ls'],
        'bafs': ['bafs', '企業會計', '會計'],
    };

    // Filter the tutors array
    let filtered = tutors.filter(function(tutor) {
        // Check if search text matches
        let matchesSearch = true;
        if (searchText !== '') {
            matchesSearch = false;
            
            // Get all the words we should check against
            let wordsToCheck = [searchText];
            if (subjectMap[searchText]) {
                wordsToCheck = subjectMap[searchText];
            }
            
            // Check tutor's name
            for (let word of wordsToCheck) {
                if (tutor.name.toLowerCase().includes(word)) {
                    matchesSearch = true;
                    break;
                }
            }
            
            // Check subjects offered
            if (!matchesSearch) {
                for (let s of tutor.subjectsOffered) {
                    for (let word of wordsToCheck) {
                        if (s.subject.toLowerCase().includes(word)) {
                            matchesSearch = true;
                            break;
                        }
                    }
                    if (matchesSearch) break;
                }
            }
            
            // Check tutor's own DSE grades
            if (!matchesSearch) {
                for (let g of tutor.grades) {
                    for (let word of wordsToCheck) {
                        if (g.subject.toLowerCase().includes(word)) {
                            matchesSearch = true;
                            break;
                        }
                    }
                    if (matchesSearch) break;
                }
            }
            
            // Check university, major, secondary school
            if (!matchesSearch) {
                for (let word of wordsToCheck) {
                    if (tutor.university.toLowerCase().includes(word) ||
                        tutor.major.toLowerCase().includes(word) ||
                        tutor.secondarySchool.toLowerCase().includes(word) ||
                        tutor.bio.toLowerCase().includes(word)) {
                        matchesSearch = true;
                        break;
                    }
                }
            }
        }

        // Check if level matches
        let matchesLevel = true;
        if (levelFilter !== '') {
            matchesLevel = false;
            for (let s of tutor.subjectsOffered) {
                if (s.level === levelFilter) {
                    matchesLevel = true;
                    break;
                }
            }
        }

        // Check if price is within limit
        let matchesPrice = true;
        if (maxPrice !== '') {
            let lowestPrice = Math.min(...tutor.subjectsOffered.map(s => s.price));
            if (lowestPrice > parseInt(maxPrice)) {
                matchesPrice = false;
            }
        }

        return matchesSearch && matchesLevel && matchesPrice;
    });

    // Display the filtered results
    displayTutors(filtered);
}

// ==========================================
// RUN ON PAGE LOAD
// ==========================================
displayTutors(tutors);