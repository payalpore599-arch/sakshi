-- connection: 6ada3d28f0661cf5ae0f0a33

<!-- ============================================
     🎤 मराठी Personal Voice Assistant
     ============================================
     कसे वापरावे:
     1. हा संपूर्ण code copy करा
     2. Notepad मध्ये paste करा
     3. "assistant.html" म्हणून save करा (Save as Type: All Files)
     4. Chrome/Edge मध्ये file open करा
     
     ⚠️ Voice Recognition फक्त Chrome/Edge मध्ये काम करेल
     ⚠️ Gemini API साठी Settings मध्ये API key टाका
     ============================================ -->

<!DOCTYPE html>
<html lang="mr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>मराठी Voice Assistant</title>
    <style>
        /* ===== CSS Variables & Reset ===== */
        :root {
            --bg-primary: #0f0f14;
            --bg-secondary: #1a1a24;
            --bg-tertiary: #252533;
            --bg-hover: #2d2d3d;
            --text-primary: #e8e8ed;
            --text-secondary: #9898a8;
            --text-muted: #6a6a7a;
            --accent: #527df2;
            --accent-hover: #6b91f5;
            --accent-glow: rgba(82, 125, 242, 0.3);
            --success: #4ade80;
            --warning: #fbbf24;
            --danger: #f87171;
            --border: #2a2a3a;
            --radius: 12px;
            --radius-sm: 8px;
            --shadow: 0 4px 24px rgba(0,0,0,0.4);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
            background: var(--bg-primary);
            color: var(--text-primary);
            height: 100vh;
            overflow: hidden;
        }

        /* ===== Layout ===== */
        .app-container {
            display: grid;
            grid-template-columns: 1fr 340px;
            grid-template-rows: auto 1fr auto;
            height: 100vh;
        }

        /* ===== Header ===== */
        .header {
            grid-column: 1 / -1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 24px;
            background: var(--bg-secondary);
            border-bottom: 1px solid var(--border);
        }

        .header-left {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .logo {
            width: 36px;
            height: 36px;
            background: linear-gradient(135deg, var(--accent), #8b5cf6);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
        }

        .header h1 {
            font-size: 18px;
            font-weight: 600;
        }

        .header h1 span {
            color: var(--accent);
        }

        .header-actions {
            display: flex;
            gap: 8px;
        }

        .btn-icon {
            width: 36px;
            height: 36px;
            border: none;
            background: var(--bg-tertiary);
            color: var(--text-secondary);
            border-radius: var(--radius-sm);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            transition: all 0.2s;
        }

        .btn-icon:hover {
            background: var(--bg-hover);
            color: var(--text-primary);
        }

        /* ===== Status Bar ===== */
        .status-bar {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 6px 14px;
            background: var(--bg-tertiary);
            border-radius: 20px;
            font-size: 13px;
        }

        .status-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--text-muted);
        }

        .status-dot.idle { background: var(--text-muted); }
        .status-dot.listening { background: var(--danger); animation: pulse 1s infinite; }
        .status-dot.thinking { background: var(--warning); animation: pulse 0.5s infinite; }
        .status-dot.speaking { background: var(--success); animation: pulse 1s infinite; }

        @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.3); }
        }

        /* ===== Chat Area ===== */
        .chat-area {
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .messages {
            flex: 1;
            overflow-y: auto;
            padding: 24px;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .messages::-webkit-scrollbar { width: 6px; }
        .messages::-webkit-scrollbar-track { background: transparent; }
        .messages::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }

        .message {
            display: flex;
            gap: 12px;
            max-width: 80%;
            animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .message.user { align-self: flex-end; flex-direction: row-reverse; }

        .message-avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            flex-shrink: 0;
        }

        .message.assistant .message-avatar {
            background: linear-gradient(135deg, var(--accent), #8b5cf6);
        }

        .message.user .message-avatar {
            background: var(--bg-tertiary);
        }

        .message-bubble {
            padding: 12px 16px;
            border-radius: var(--radius);
            line-height: 1.6;
            font-size: 14px;
        }

        .message.assistant .message-bubble {
            background: var(--bg-secondary);
            border: 1px solid var(--border);
        }

        .message.user .message-bubble {
            background: var(--accent);
            color: white;
        }

        .message-time {
            font-size: 11px;
            color: var(--text-muted);
            margin-top: 4px;
        }

        /* ===== Input Area ===== */
        .input-area {
            padding: 16px 24px;
            background: var(--bg-secondary);
            border-top: 1px solid var(--border);
        }

        .input-row {
            display: flex;
            gap: 12px;
            align-items: center;
        }

        .text-input {
            flex: 1;
            padding: 12px 16px;
            background: var(--bg-tertiary);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            color: var(--text-primary);
            font-size: 14px;
            outline: none;
            transition: border-color 0.2s;
        }

        .text-input:focus { border-color: var(--accent); }

        .text-input::placeholder { color: var(--text-muted); }

        /* ===== Mic Button ===== */
        .mic-btn {
            width: 48px;
            height: 48px;
            border: none;
            border-radius: 50%;
            background: var(--accent);
            color: white;
            font-size: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
            position: relative;
        }

        .mic-btn:hover { background: var(--accent-hover); transform: scale(1.05); }

        .mic-btn.listening {
            background: var(--danger);
            animation: micPulse 1.5s infinite;
        }

        @keyframes micPulse {
            0% { box-shadow: 0 0 0 0 rgba(248, 113, 113, 0.5); }
            70% { box-shadow: 0 0 0 15px rgba(248, 113, 113, 0); }
            100% { box-shadow: 0 0 0 0 rgba(248, 113, 113, 0); }
        }

        .send-btn {
            width: 48px;
            height: 48px;
            border: none;
            border-radius: var(--radius);
            background: var(--accent);
            color: white;
            font-size: 18px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
        }

        .send-btn:hover { background: var(--accent-hover); }

        /* ===== Side Panel ===== */
        .side-panel {
            grid-row: 2 / 4;
            background: var(--bg-secondary);
            border-left: 1px solid var(--border);
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .panel-tabs {
            display: flex;
            border-bottom: 1px solid var(--border);
        }

        .panel-tab {
            flex: 1;
            padding: 12px;
            border: none;
            background: none;
            color: var(--text-secondary);
            font-size: 13px;
            cursor: pointer;
            transition: all 0.2s;
            border-bottom: 2px solid transparent;
        }

        .panel-tab.active {
            color: var(--accent);
            border-bottom-color: var(--accent);
        }

        .panel-content {
            flex: 1;
            overflow-y: auto;
            padding: 16px;
        }

        .panel-content::-webkit-scrollbar { width: 4px; }
        .panel-content::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

        /* ===== Notes ===== */
        .note-input-row {
            display: flex;
            gap: 8px;
            margin-bottom: 16px;
        }

        .note-input {
            flex: 1;
            padding: 8px 12px;
            background: var(--bg-tertiary);
            border: 1px solid var(--border);
            border-radius: var(--radius-sm);
            color: var(--text-primary);
            font-size: 13px;
            outline: none;
        }

        .note-input:focus { border-color: var(--accent); }

        .btn-small {
            padding: 8px 14px;
            border: none;
            background: var(--accent);
            color: white;
            border-radius: var(--radius-sm);
            font-size: 13px;
            cursor: pointer;
            transition: background 0.2s;
        }

        .btn-small:hover { background: var(--accent-hover); }

        .note-item {
            padding: 12px;
            background: var(--bg-tertiary);
            border-radius: var(--radius-sm);
            margin-bottom: 8px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 8px;
        }

        .note-text { font-size: 13px; line-height: 1.5; flex: 1; }

        .note-time { font-size: 11px; color: var(--text-muted); margin-top: 4px; }

        .note-delete {
            background: none;
            border: none;
            color: var(--text-muted);
            cursor: pointer;
            font-size: 14px;
            padding: 2px;
        }

        .note-delete:hover { color: var(--danger); }

        /* ===== Settings Panel ===== */
        .settings-group {
            margin-bottom: 20px;
        }

        .settings-group label {
            display: block;
            font-size: 12px;
            color: var(--text-secondary);
            margin-bottom: 6px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .settings-input {
            width: 100%;
            padding: 10px 12px;
            background: var(--bg-tertiary);
            border: 1px solid var(--border);
            border-radius: var(--radius-sm);
            color: var(--text-primary);
            font-size: 13px;
            outline: none;
        }

        .settings-input:focus { border-color: var(--accent); }

        .settings-hint {
            font-size: 11px;
            color: var(--text-muted);
            margin-top: 4px;
        }

        .btn-save {
            width: 100%;
            padding: 10px;
            border: none;
            background: var(--accent);
            color: white;
            border-radius: var(--radius-sm);
            font-size: 14px;
            cursor: pointer;
            margin-top: 8px;
        }

        .btn-save:hover { background: var(--accent-hover); }

        /* ===== Quick Actions ===== */
        .quick-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            padding: 0 24px 12px;
        }

        .quick-btn {
            padding: 6px 14px;
            background: var(--bg-tertiary);
            border: 1px solid var(--border);
            border-radius: 20px;
            color: var(--text-secondary);
            font-size: 12px;
            cursor: pointer;
            transition: all 0.2s;
        }

        .quick-btn:hover {
            background: var(--bg-hover);
            color: var(--text-primary);
            border-color: var(--accent);
        }

        /* ===== Weather Card ===== */
        .weather-card {
            background: linear-gradient(135deg, #1e3a5f, #2d1b69);
            border-radius: var(--radius);
            padding: 16px;
            margin-bottom: 8px;
        }

        .weather-city { font-size: 14px; color: var(--text-secondary); }
        .weather-temp { font-size: 36px; font-weight: 700; margin: 4px 0; }
        .weather-desc { font-size: 13px; color: var(--text-secondary); text-transform: capitalize; }
        .weather-details { display: flex; gap: 16px; margin-top: 12px; font-size: 12px; color: var(--text-muted); }

        /* ===== Music / Smart Home Placeholder ===== */
        .placeholder-card {
            padding: 20px;
            background: var(--bg-tertiary);
            border-radius: var(--radius);
            text-align: center;
            margin-bottom: 12px;
        }

        .placeholder-card .icon { font-size: 32px; margin-bottom: 8px; }
        .placeholder-card .title { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
        .placeholder-card .desc { font-size: 12px; color: var(--text-muted); }

        .music-controls {
            display: flex;
            justify-content: center;
            gap: 16px;
            margin-top: 12px;
        }

        .music-btn {
            width: 40px;
            height: 40px;
            border: none;
            background: var(--bg-hover);
            color: var(--text-primary);
            border-radius: 50%;
            font-size: 16px;
            cursor: pointer;
        }

        .music-btn:hover { background: var(--accent); }

        /* ===== Smart Home Devices ===== */
        .device-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
        }

        .device-card {
            padding: 14px;
            background: var(--bg-tertiary);
            border: 1px solid var(--border);
            border-radius: var(--radius-sm);
            text-align: center;
            cursor: pointer;
            transition: all 0.2s;
        }

        .device-card:hover { border-color: var(--accent); }
        .device-card.active { border-color: var(--success); background: rgba(74, 222, 128, 0.05); }
        .device-card .icon { font-size: 24px; margin-bottom: 6px; }
        .device-card .name { font-size: 12px; color: var(--text-secondary); }

        /* ===== Typing indicator ===== */
        .typing-indicator {
            display: flex;
            gap: 4px;
            padding: 8px 0;
        }

        .typing-dot {
            width: 6px;
            height: 6px;
            background: var(--text-muted);
            border-radius: 50%;
            animation: typingBounce 1.4s infinite;
        }

        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typingBounce {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-6px); }
        }

        /* ===== Profile Section ===== */
        .profile-card {
            text-align: center;
            padding: 20px 16px;
        }

        .profile-avatar-large {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--accent), #8b5cf6);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 36px;
            margin: 0 auto 12px;
            cursor: pointer;
            transition: transform 0.2s;
            border: 3px solid var(--border);
        }

        .profile-avatar-large:hover { transform: scale(1.05); }

        .profile-name-display {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 4px;
        }

        .profile-personality-display {
            font-size: 12px;
            color: var(--text-secondary);
            margin-bottom: 16px;
        }

        .profile-edit-btn {
            padding: 8px 20px;
            background: var(--accent);
            color: white;
            border: none;
            border-radius: var(--radius-sm);
            font-size: 13px;
            cursor: pointer;
        }

        .profile-edit-btn:hover { background: var(--accent-hover); }

        .avatar-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 8px;
            margin-bottom: 16px;
        }

        .avatar-option {
            width: 100%;
            aspect-ratio: 1;
            border: 2px solid var(--border);
            border-radius: 50%;
            background: var(--bg-tertiary);
            font-size: 24px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
        }

        .avatar-option:hover { border-color: var(--accent); transform: scale(1.1); }
        .avatar-option.selected { border-color: var(--accent); background: var(--accent-glow); box-shadow: 0 0 12px var(--accent-glow); }

        .personality-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            margin-bottom: 16px;
        }

        .personality-option {
            padding: 10px;
            background: var(--bg-tertiary);
            border: 1px solid var(--border);
            border-radius: var(--radius-sm);
            color: var(--text-secondary);
            font-size: 12px;
            cursor: pointer;
            text-align: center;
            transition: all 0.2s;
        }

        .personality-option:hover { border-color: var(--accent); color: var(--text-primary); }
        .personality-option.selected { border-color: var(--accent); background: var(--accent-glow); color: var(--text-primary); }
        .personality-option .emoji { font-size: 20px; display: block; margin-bottom: 4px; }

        /* ===== Profile Setup Modal ===== */
        .modal-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        }

        .modal-overlay.hidden { display: none; }

        .modal {
            background: var(--bg-secondary);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            padding: 32px;
            width: 420px;
            max-width: 90vw;
            max-height: 85vh;
            overflow-y: auto;
            box-shadow: var(--shadow);
        }

        .modal h2 {
            font-size: 20px;
            margin-bottom: 4px;
            text-align: center;
        }

        .modal .subtitle {
            font-size: 13px;
            color: var(--text-secondary);
            text-align: center;
            margin-bottom: 24px;
        }

        .modal .settings-group { margin-bottom: 16px; }

        .modal .btn-save { margin-top: 16px; }

        /* ===== Responsive ===== */
        @media (max-width: 768px) {
            .app-container { grid-template-columns: 1fr; }
            .side-panel { display: none; }
            .message { max-width: 95%; }
        }
    </style>
</head>
<body>

<div class="app-container">
    <!-- Header -->
    <header class="header">
        <div class="header-left">
            <div class="logo">🎤</div>
            <h1>मराठी <span>Assistant</span></h1>
        </div>
        <div class="status-bar">
            <div class="status-dot idle" id="statusDot"></div>
            <span id="statusText">तयार आहे</span>
        </div>
        <div class="header-actions">
            <button class="btn-icon" onclick="togglePanel('settings')" title="Settings">⚙️</button>
        </div>
    </header>

    <!-- Chat Area -->
    <main class="chat-area">
        <div class="messages" id="messages">
            <div class="message assistant">
                <div class="message-avatar">🤖</div>
                <div>
                    <div class="message-bubble">
                        नमस्कार! 🙏 मी तुमचा मराठी Voice Assistant आहे. मला काहीही विचारा — मी तुम्हाला मदत करतो!
                        <br><br>
                        🎤 माइक बटण दाबा आणि बोला, किंवा खाली टाइप करा.
                    </div>
                    <div class="message-time">आत्ताच</div>
                </div>
            </div>
        </div>

        <div class="quick-actions">
            <button class="quick-btn" onclick="sendQuick('वेळ काय झाली?')">🕐 वेळ</button>
            <button class="quick-btn" onclick="sendQuick('आजची तारीख काय?')">📅 तारीख</button>
            <button class="quick-btn" onclick="sendQuick('मुंबईचे हवामान कसे आहे?')">🌤️ हवामान</button>
            <button class="quick-btn" onclick="sendQuick('एक joke सांग')">😂 विनोद</button>
            <button class="quick-btn" onclick="sendQuick('मला एक motivational quote सांग')">💪 प्रेरणा</button>
        </div>

        <div class="input-area">
            <div class="input-row">
                <button class="mic-btn" id="micBtn" onclick="toggleListening()" title="बोला">🎤</button>
                <input type="text" class="text-input" id="textInput" 
                       placeholder="इथे टाइप करा किंवा माइक दाबा..." 
                       onkeypress="if(event.key==='Enter')sendText()">
                <button class="send-btn" onclick="sendText()" title="पाठवा">➤</button>
            </div>
        </div>
    </main>

    <!-- Side Panel -->
    <aside class="side-panel" id="sidePanel">
        <div class="panel-tabs">
            <button class="panel-tab active" onclick="switchTab('profile')">👤 Profile</button>
            <button class="panel-tab" onclick="switchTab('notes')">📝 नोट्स</button>
            <button class="panel-tab" onclick="switchTab('home')">🏠 होम</button>
            <button class="panel-tab" onclick="switchTab('settings')">⚙️ सेटिंग्ज</button>
        </div>

        <!-- Profile Tab -->
        <div class="panel-content" id="tab-profile">
            <div class="profile-card">
                <div class="profile-avatar-large" id="profileAvatarLarge" onclick="openProfileModal()">🤖</div>
                <div class="profile-name-display" id="profileNameDisplay">मराठी Assistant</div>
                <div class="profile-personality-display" id="profilePersonalityDisplay">Friendly आणि Helpful</div>
                <button class="profile-edit-btn" onclick="openProfileModal()">✏️ Profile Edit करा</button>
            </div>
            <div style="padding: 0 8px">
                <div class="settings-group">
                    <label>📊 Profile Status</label>
                    <div style="font-size:12px; color:var(--text-secondary); line-height:1.8">
                        <div>नाव: <span id="profileStatusName" style="color:var(--text-primary)">मराठी Assistant</span></div>
                        <div>Avatar: <span id="profileStatusAvatar" style="color:var(--text-primary)">🤖</span></div>
                        <div>Personality: <span id="profileStatusPersonality" style="color:var(--text-primary)">Friendly</span></div>
                        <div>भाषा: <span id="profileStatusLang" style="color:var(--text-primary)">मराठी</span></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Notes Tab -->
        <div class="panel-content" id="tab-notes">
            <div class="note-input-row">
                <input type="text" class="note-input" id="noteInput" 
                       placeholder="नवीन नोट लिहा..." onkeypress="if(event.key==='Enter')addNote()">
                <button class="btn-small" onclick="addNote()">+</button>
            </div>
            <div id="notesList"></div>
        </div>

        <!-- Smart Home Tab -->
        <div class="panel-content" id="tab-home" style="display:none">
            <div class="device-grid">
                <div class="device-card" onclick="toggleDevice(this, 'दिवणखाना')">
                    <div class="icon">💡</div>
                    <div class="name">दिवणखाना</div>
                </div>
                <div class="device-card" onclick="toggleDevice(this, 'शयनकक्ष')">
                    <div class="icon">🛏️</div>
                    <div class="name">शयनकक्ष</div>
                </div>
                <div class="device-card" onclick="toggleDevice(this, 'स्वयंपाकघर')">
                    <div class="icon">🍳</div>
                    <div class="name">स्वयंपाकघर</div>
                </div>
                <div class="device-card" onclick="toggleDevice(this, 'AC')">
                    <div class="icon">❄️</div>
                    <div class="name">AC</div>
                </div>
                <div class="device-card" onclick="toggleDevice(this, 'TV')">
                    <div class="icon">📺</div>
                    <div class="name">TV</div>
                </div>
                <div class="device-card" onclick="toggleDevice(this, 'पंखा')">
                    <div class="icon">🌀</div>
                    <div class="name">पंखा</div>
                </div>
            </div>
            <div class="placeholder-card" style="margin-top: 16px">
                <div class="icon">🏠</div>
                <div class="title">Smart Home</div>
                <div class="desc">Home Assistant API connect करा पूर्ण नियंत्रणासाठी</div>
            </div>
        </div>

        <!-- Settings Tab -->
        <div class="panel-content" id="tab-settings" style="display:none">
            <div class="settings-group">
                <label>🤖 Google Gemini API Key</label>
                <input type="password" class="settings-input" id="geminiKey" 
                       placeholder="AIza...">
                <div class="settings-hint">
                    <a href="https://aistudio.google.com/apikey" target="_blank" 
                       style="color:var(--accent)">Google AI Studio</a> वरून free API key मिळवा
                </div>
            </div>
            <div class="settings-group">
                <label>🌤️ OpenWeatherMap API Key</label>
                <input type="password" class="settings-input" id="weatherKey" 
                       placeholder="Havamaana sathi...">
                <div class="settings-hint">
                    <a href="https://openweathermap.org/api" target="_blank" 
                       style="color:var(--accent)">OpenWeatherMap</a> वरून free key मिळवा
                </div>
            </div>
            <div class="settings-group">
                <label>🎤 भाषा</label>
                <select class="settings-input" id="langSelect">
                    <option value="mr-IN" selected>मराठी</option>
                    <option value="hi-IN">हिंदी</option>
                    <option value="en-IN">English (India)</option>
                </select>
            </div>
            <div class="settings-group">
                <label>🔊 आवाज</label>
                <select class="settings-input" id="voiceSelect">
                    <option value="">Default</option>
                </select>
            </div>
            <button class="btn-save" onclick="saveSettings()">💾 सेव्ह करा</button>
            <div id="settingsStatus" style="text-align:center;margin-top:8px;font-size:12px;color:var(--success)"></div>
        </div>
    </aside>
</div>

<!-- Profile Setup Modal -->
<div class="modal-overlay hidden" id="profileModal">
    <div class="modal">
        <h2>👤 Assistant Profile</h2>
        <p class="subtitle">तुमच्या assistant ला ओळख द्या!</p>
        <div class="settings-group">
            <label>✏️ नाव</label>
            <input type="text" class="settings-input" id="profileNameInput" placeholder="उदा: सखी, राजा, बोटू...">
        </div>
        <div class="settings-group">
            <label>😎 Avatar निवडा</label>
            <div class="avatar-grid" id="avatarGrid">
                <button class="avatar-option selected" data-avatar="🤖" onclick="selectAvatar(this)">🤖</button>
                <button class="avatar-option" data-avatar="🧠" onclick="selectAvatar(this)">🧠</button>
                <button class="avatar-option" data-avatar="🦊" onclick="selectAvatar(this)">🦊</button>
                <button class="avatar-option" data-avatar="🐱" onclick="selectAvatar(this)">🐱</button>
                <button class="avatar-option" data-avatar="🦁" onclick="selectAvatar(this)">🦁</button>
                <button class="avatar-option" data-avatar="🐼" onclick="selectAvatar(this)">🐼</button>
                <button class="avatar-option" data-avatar="🌸" onclick="selectAvatar(this)">🌸</button>
                <button class="avatar-option" data-avatar="⭐" onclick="selectAvatar(this)">⭐</button>
                <button class="avatar-option" data-avatar="🔮" onclick="selectAvatar(this)">🔮</button>
                <button class="avatar-option" data-avatar="🎭" onclick="selectAvatar(this)">🎭</button>
                <button class="avatar-option" data-avatar="👑" onclick="selectAvatar(this)">👑</button>
                <button class="avatar-option" data-avatar="🌈" onclick="selectAvatar(this)">🌈</button>
                <button class="avatar-option" data-avatar="💎" onclick="selectAvatar(this)">💎</button>
                <button class="avatar-option" data-avatar="🎯" onclick="selectAvatar(this)">🎯</button>
                <button class="avatar-option" data-avatar="🚀" onclick="selectAvatar(this)">🚀</button>
            </div>
        </div>
        <div class="settings-group">
            <label>🎭 Personality निवडा</label>
            <div class="personality-grid" id="personalityGrid">
                <button class="personality-option selected" data-personality="friendly" onclick="selectPersonality(this)"><span class="emoji">😊</span>Friendly</button>
                <button class="personality-option" data-personality="funny" onclick="selectPersonality(this)"><span class="emoji">😂</span>विनोदी</button>
                <button class="personality-option" data-personality="professional" onclick="selectPersonality(this)"><span class="emoji">💼</span>Professional</button>
                <button class="personality-option" data-personality="caring" onclick="selectPersonality(this)"><span class="emoji">🤗</span>काळजीवाहू</button>
                <button class="personality-option" data-personality="wise" onclick="selectPersonality(this)"><span class="emoji">🧙</span>ज्ञानी</button>
                <button class="personality-option" data-personality="energetic" onclick="selectPersonality(this)"><span class="emoji">⚡</span>उर्जावान</button>
            </div>
        </div>
        <button class="btn-save" onclick="saveProfile()">💾 Profile सेव्ह करा</button>
        <div id="profileModalStatus" style="text-align:center;margin-top:8px;font-size:12px;color:var(--success)"></div>
    </div>
</div>

<script>
// ============================================
// State Management
// ============================================
const state = {
    isListening: false,
    isSpeaking: false,
    status: 'idle', // idle, listening, thinking, speaking
    recognition: null,
    synthesis: window.speechSynthesis,
    messages: [],
    notes: JSON.parse(localStorage.getItem('mr_notes') || '[]'),
    settings: JSON.parse(localStorage.getItem('mr_settings') || '{"geminiKey":"AQ.Ab8RN6JJkYCG6mwz1wMVUsDE4xtTcJ0_QR9CmUbN3v2HohoxwAhe"}'),
    devices: JSON.parse(localStorage.getItem('mr_devices') || '{}')
};

// ============================================
// Speech Recognition Setup
// ============================================
function initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        console.warn('Speech Recognition not supported in this browser');
        return;
    }

    state.recognition = new SpeechRecognition();
    state.recognition.lang = state.settings.language || 'mr-IN';
    state.recognition.continuous = false;
    state.recognition.interimResults = true;

    state.recognition.onstart = () => {
        state.isListening = true;
        setStatus('listening', 'ऐकत आहे...');
        document.getElementById('micBtn').classList.add('listening');
    };

    state.recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        document.getElementById('textInput').value = transcript;

        if (event.results[event.resultIndex].isFinal) {
            processUserInput(transcript);
            document.getElementById('textInput').value = '';
        }
    };

    state.recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
            addMessage('assistant', '⚠️ माइक्रोफोन access denied. Browser settings मध्ये microphone permission द्या.');
        } else if (event.error !== 'aborted') {
            addMessage('assistant', '⚠️ ऐकण्यात समस्या आली. कृपया पुन्हा प्रयत्न करा.');
        }
        stopListening();
    };

    state.recognition.onend = () => {
        stopListening();
    };
}

function toggleListening() {
    if (state.isListening) {
        state.recognition.stop();
        stopListening();
    } else {
        startListening();
    }
}

function startListening() {
    if (!state.recognition) {
        addMessage('assistant', '⚠️ तुमचा browser Speech Recognition support करत नाही. Chrome किंवा Edge वापरा.');
        return;
    }
    state.recognition.lang = state.settings.language || 'mr-IN';
    try {
        state.recognition.start();
    } catch (e) {
        console.error('Recognition start error:', e);
    }
}

function stopListening() {
    state.isListening = false;
    document.getElementById('micBtn').classList.remove('listening');
    if (state.status === 'listening') {
        setStatus('idle', 'तयार आहे');
    }
}

// ============================================
// Speech Synthesis (Text-to-Speech)
// ============================================
function speak(text) {
    if (!state.synthesis) return;

    state.synthesis.cancel(); // Cancel any ongoing speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = state.settings.language || 'mr-IN';
    utterance.rate = 0.9;
    utterance.pitch = 1;

    // Try to find a Marathi/Hindi voice
    const voices = state.synthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.startsWith('mr')) 
                        || voices.find(v => v.lang.startsWith('hi'))
                        || voices.find(v => v.lang.includes('IN'));
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onstart = () => {
        state.isSpeaking = true;
        setStatus('speaking', 'बोलत आहे...');
    };

    utterance.onend = () => {
        state.isSpeaking = false;
        setStatus('idle', 'तयार आहे');
    };

    state.synthesis.speak(utterance);
}

// Load voices
if (state.synthesis) {
    state.synthesis.onvoiceschanged = () => {
        const voiceSelect = document.getElementById('voiceSelect');
        const voices = state.synthesis.getVoices();
        const indianVoices = voices.filter(v => v.lang.includes('IN') || v.lang.startsWith('mr') || v.lang.startsWith('hi'));
        
        voiceSelect.innerHTML = '<option value="">Default</option>';
        indianVoices.forEach((v, i) => {
            const opt = document.createElement('option');
            opt.value = i;
            opt.textContent = `${v.name} (${v.lang})`;
            voiceSelect.appendChild(opt);
        });
    };
}

// ============================================
// Status Management
// ============================================
function setStatus(status, text) {
    state.status = status;
    const dot = document.getElementById('statusDot');
    const label = document.getElementById('statusText');
    dot.className = 'status-dot ' + status;
    label.textContent = text;
}

// ============================================
// Message Handling
// ============================================
function addMessage(role, text) {
    const messagesDiv = document.getElementById('messages');
    const time = new Date().toLocaleTimeString('mr-IN', { hour: '2-digit', minute: '2-digit' });

    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${role}`;

    const avatar = role === 'assistant' ? getAssistantAvatar() : '👤';
    msgDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div>
            <div class="message-bubble">${formatMessage(text)}</div>
            <div class="message-time">${time}</div>
        </div>
    `;

    messagesDiv.appendChild(msgDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    state.messages.push({ role, text, time });
}

function formatMessage(text) {
    // Basic formatting: preserve newlines, bold with **
    return text
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
}
function showTyping() {
    const messagesDiv = document.getElementById('messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message assistant';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">${getAssistantAvatar()}</div>
        <div>
            <div class="message-bubble">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        </div>
    `;
    messagesDiv.appendChild(typingDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function removeTyping() {
    const el = document.getElementById('typingIndicator');
    if (el) el.remove();
}

// ============================================
// Command Processing
// ============================================
async function processUserInput(text) {
    if (!text.trim()) return;

    addMessage('user', text);
    setStatus('thinking', 'विचार करत आहे...');
    showTyping();

    const lowerText = text.toLowerCase().trim();

    // Check for built-in commands first
    const builtinResponse = handleBuiltinCommands(lowerText, text);
    if (builtinResponse !== null) {
        removeTyping();
        addMessage('assistant', builtinResponse);
        speak(builtinResponse.replace(/<[^>]*>/g, '')); // Strip HTML for speech
        return;
    }

    // Fall back to Gemini API
    const geminiResponse = await getGeminiResponse(text);
    removeTyping();
    addMessage('assistant', geminiResponse);
    speak(geminiResponse.replace(/<[^>]*>/g, ''));
}

function handleBuiltinCommands(lowerText, originalText) {
    // Time
    if (lowerText.includes('वेळ') || lowerText.includes('time')) {
        const now = new Date();
        const time = now.toLocaleTimeString('mr-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        return `🕐 आत्ताची वेळ: **${time}**`;
    }

    // Date
    if (lowerText.includes('तारीख') || lowerText.includes('date') || lowerText.includes('दिवस')) {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const date = now.toLocaleDateString('mr-IN', options);
        return `📅 आजची तारीख: **${date}**`;
    }

    // Weather
    if (lowerText.includes('हवामान') || lowerText.includes('weather') || lowerText.includes('तापमान')) {
        const city = extractCity(originalText) || 'Mumbai';
        return getWeather(city);
    }

    // Notes - Add
    if (lowerText.includes('note') || lowerText.includes('नोंद') || lowerText.includes('लिहून')) {
        const noteText = originalText.replace(/note लिहा|नोंद लिहा|लिहून ठेवा/gi, '').trim();
        if (noteText) {
            addNoteFromVoice(noteText);
            return `📝 नोट सेव्ह केली: "${noteText}"`;
        }
        return '📝 कृपया नोट सांगा. उदाहरण: "note लिहा: दुकानात जायचे आहे"';
    }

    // Notes - Show
    if (lowerText.includes('notes') || lowerText.includes('नोट्स') || lowerText.includes('નોંધ')) {
        const notes = JSON.parse(localStorage.getItem('mr_notes') || '[]');
        if (notes.length === 0) return '📝 कोणत्याही नोट्स नाहीत.';
        let response = '📝 तुमच्या नोट्स:\n\n';
        notes.slice(-5).forEach((n, i) => {
            response += `${i + 1}. ${n.text}\n`;
        });
        return response;
    }

    // Greeting
    if (lowerText.includes('नमस्कार') || lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('हॅलो')) {
        const greetings = [
            'नमस्कार! 🙏 मी तुमचा मराठी assistant. काय मदत हवी?',
            'हॅलो! 😊 सांगा, मी कशी मदत करू?',
            'नमस्कार! आज तुम्हाला कशी मदत हवी?'
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // How are you
    if (lowerText.includes('कसे आहे') || lowerText.includes('कशी आहे') || lowerText.includes('how are you')) {
        return 'मी छान आहे! 😊 तुम्ही कसे आहात? मला काही मदत हवी असल्यास सांगा.';
    }

    // Thank you
    if (lowerText.includes('धन्यवाद') || lowerText.includes('thanks') || lowerText.includes('thank you')) {
        return 'तुमचे स्वागत आहे! 😊 आणखी काही मदत हवी असल्यास विचारा.';
    }

    // Goodbye
    if (lowerText.includes('bye') || lowerText.includes('निघतो') || lowerText.includes('allo')) {
        return 'पुन्हा भेटूया! 👋 तुमचा दिवस शुभ असो!';
    }

    // Who are you
    if (lowerText.includes('कोण आहे') || lowerText.includes('तुझे नाव') || lowerText.includes('who are you')) {
    if (lowerText.includes('कोण आहे') || lowerText.includes('तुझे नाव') || lowerText.includes('who are you')) {
        return `मी **${getAssistantName()}** आहे! ${getAssistantAvatar()} मला Google Gemini AI ची मदत आहे. मला मराठी, हिंदी किंवा English मध्ये काहीही विचारा!`;
    }

    // Joke
    if (lowerText.includes('joke') || lowerText.includes('विनोद') || lowerText.includes('हसव')) {
        const jokes = [
            'शिक्षक: तुझे नाव काय?\nविद्यार्थी: माझे नाव "आहे" आहे.\nशिक्षक: अरे, "आहे" हे नाव नसतं!\nविद्यार्थी: मग "नाही" हे नाव आहे का? 😂',
            'बायको: ऐकता, मला नवीन साडी हवी.\nनवरा: अरे, तुझ्याकडे तर साड्या आहेत!\nबायको: हो, पण त्या जुन्या झाल्या.\nनवरा: मग मी काय करू?\nबायको: नवीन नवरा आणा! 😂',
            'डॉक्टर: तुम्हाला रोज सकाळी jog करायला हवं.\nरुग्ण: पण डॉक्टर, मी तर bus ने office ला जातो!\nडॉक्टर: अरे, bus मधून उतरून चाला! 😂'
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
    }

    // Motivation
    if (lowerText.includes('motivat') || lowerText.includes('प्रेरणा') || lowerText.includes('quote')) {
        const quotes = [
            '💪 "यश हे प्रवासात आहे, मंजिलीत नाही."',
            '💪 "स्वतःवर विश्वास ठेवा, तुम्ही नक्की यशस्वी व्हाल."',
            '💪 "कठीण काळ कायम राहत नाही, कठीण लोक कायम राहतात."',
            '💪 "आजचे कष्ट उद्याचे यश बनतात."',
            '💪 "स्वप्ने तीच पूर्ण होतात, ज्यांच्यासाठी तुम्ही जागता."'
        ];
        return quotes[Math.floor(Math.random() * quotes.length)];
    }

    // Smart home commands
    if (lowerText.includes('light') || lowerText.includes('लाइट') || lowerText.includes('diva')) {
        if (lowerText.includes('on') || lowerText.includes('चालू') || lowerText.includes('लाव')) {
            return '💡 दिवे चालू केले! (Smart Home integration लवकरच)';
        }
        if (lowerText.includes('off') || lowerText.includes('बंद') || lowerText.includes('विझव')) {
            return '💡 दिवे बंद केले! (Smart Home integration लवकरच)';
        }
    }

    if (lowerText.includes('fan') || lowerText.includes('पंखा')) {
        if (lowerText.includes('on') || lowerText.includes('चालू')) {
            return '🌀 पंखा चालू केला! (Smart Home integration लवकरच)';
        }
        if (lowerText.includes('off') || lowerText.includes('बंद')) {
            return '🌀 पंखा बंद केला! (Smart Home integration लवकरच)';
        }
    }

    return null; // Not a builtin command
}

function extractCity(text) {
    const cities = ['मुंबई', 'पुणे', 'नागपूर', 'नाशिक', 'औरंगाबाद', 'कोल्हापूर', 'सोलापूर', 
                    'mumbai', 'pune', 'nagpur', 'nashik', 'aurangabad', 'kolhapur', 'solapur',
                    'delhi', 'bangalore', 'hyderabad', 'chennai', 'kolkata'];
    const lower = text.toLowerCase();
    for (const city of cities) {
        if (lower.includes(city)) {
            // Map Marathi names to English API names
            const map = {
                'मुंबई': 'Mumbai', 'पुणे': 'Pune', 'नागपूर': 'Nagpur',
                'नाशिक': 'Nashik', 'औरंगाबाद': 'Aurangabad', 'कोल्हापूर': 'Kolhapur',
                'सोलापूर': 'Solapur'
            };
            return map[city] || city.charAt(0).toUpperCase() + city.slice(1);
        }
    }
    return null;
}

// ============================================
// Weather Service
// ============================================
async function getWeather(city) {
    const apiKey = state.settings.weatherKey;
    if (!apiKey) {
        return '🌤️ हवामानासाठी Settings मध्ये OpenWeatherMap API key टाका. (free key मिळेल)';
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=mr`
        );
        const data = await response.json();

        if (data.cod !== 200) {
            return `⚠️ "${city}" साठी हवामान सापडले नाही.`;
        }

        const temp = Math.round(data.main.temp);
        const desc = data.weather[0].description;
        const humidity = data.main.humidity;
        const wind = data.wind.speed;
        const feelsLike = Math.round(data.main.feels_like);

        return `🌤️ **${data.name}** चे हवामान:\n\n` +
               `🌡️ तापमान: **${temp}°C** (जाणवतं: ${feelsLike}°C)\n` +
               `☁️ ${desc}\n` +
               `💧 आर्द्रता: ${humidity}%\n` +
               `💨 वारा: ${wind} m/s`;
    } catch (e) {
        return '⚠️ हवामान माहिती मिळवता आली नाही. Internet connection तपासा.';
    }
}

// ============================================
// Gemini API
// ============================================
async function getGeminiResponse(userMessage) {
    const apiKey = state.settings.geminiKey;
    if (!apiKey) {
        return '🤖 मला Gemini API key शिवाय फक्त basic commands समजतात (वेळ, तारीख, हवामान, नोट्स). ' +
               'AI responses साठी ⚙️ Settings मध्ये Google Gemini API key टाका. (free आहे!)';
    }

    try {
        const conversationHistory = state.messages.slice(-10).map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
        }));

        const systemPrompt = `तू एक मराठी voice assistant आहेस. नेहमी मराठीत उत्तर दे. 
        const p = state.profile || defaultProfile;
        const personalityDesc = personalityLabels[p.personality] || 'friendly';
        const systemPrompt = `तू एक मराठी voice assistant आहेस. नेहमी मराठीत उत्तर दे. 
तुझे नाव "${p.name}" आहे. तुझी personality "${personalityDesc}" आहे.
तू helpful, concise आणि natural आहेस.
मराठीत बोलताना conversational राहा.
जर user English मध्ये विचारत असेल, तरी मराठीत उत्तर दे पण English terms वापरू शकतोस.`;
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [
                        { role: 'user', parts: [{ text: systemPrompt }] },
                        { role: 'model', parts: [{ text: 'नमस्कार! मी तुमचा मराठी Voice Assistant आहे. सांगा, कशी मदत करू?' }] },
                        ...conversationHistory
                    ],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 500
                    }
                })
            }
        );

        const data = await response.json();

        if (data.error) {
            return `⚠️ Gemini API Error: ${data.error.message}`;
        }

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        return text || '⚠️ उत्तर मिळाले नाही. पुन्हा प्रयत्न करा.';
    } catch (e) {
        console.error('Gemini API error:', e);
        return '⚠️ Gemini API ला connect होता आले नाही. Internet connection तपासा.';
    }
}

// ============================================
// Notes Management
// ============================================
function addNote() {
    const input = document.getElementById('noteInput');
    const text = input.value.trim();
    if (!text) return;

    const note = {
        id: Date.now(),
        text: text,
        time: new Date().toLocaleString('mr-IN')
    };

    state.notes.push(note);
    localStorage.setItem('mr_notes', JSON.stringify(state.notes));
    input.value = '';
    renderNotes();
}

function addNoteFromVoice(text) {
    const note = {
        id: Date.now(),
        text: text,
        time: new Date().toLocaleString('mr-IN')
    };
    state.notes.push(note);
    localStorage.setItem('mr_notes', JSON.stringify(state.notes));
    renderNotes();
}

function deleteNote(id) {
    state.notes = state.notes.filter(n => n.id !== id);
    localStorage.setItem('mr_notes', JSON.stringify(state.notes));
    renderNotes();
}

function renderNotes() {
    const list = document.getElementById('notesList');
    if (state.notes.length === 0) {
        list.innerHTML = '<div style="text-align:center;color:var(--text-muted);padding:20px;font-size:13px">कोणत्याही नोट्स नाहीत</div>';
        return;
    }

    list.innerHTML = state.notes.slice().reverse().map(note => `
        <div class="note-item">
            <div>
                <div class="note-text">${escapeHtml(note.text)}</div>
                <div class="note-time">${note.time}</div>
            </div>
            <button class="note-delete" onclick="deleteNote(${note.id})">✕</button>
        </div>
    `).join('');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// Smart Home
// ============================================
function toggleDevice(el, name) {
    el.classList.toggle('active');
    const isOn = el.classList.contains('active');
    state.devices[name] = isOn;
    localStorage.setItem('mr_devices', JSON.stringify(state.devices));
}

// ============================================
// Settings
// ============================================
function saveSettings() {
    state.settings = {
        geminiKey: document.getElementById('geminiKey').value.trim(),
        weatherKey: document.getElementById('weatherKey').value.trim(),
        language: document.getElementById('langSelect').value,
        voiceIndex: document.getElementById('voiceSelect').value
    };
    localStorage.setItem('mr_settings', JSON.stringify(state.settings));

    // Update recognition language
    if (state.recognition) {
        state.recognition.lang = state.settings.language;
    }

    document.getElementById('settingsStatus').textContent = '✅ सेटिंग्ज सेव्ह झाले!';
    setTimeout(() => {
        document.getElementById('settingsStatus').textContent = '';
    }, 3000);
}

// ============================================
// Profile Management
// ============================================
const defaultProfile = { name: 'मराठी Assistant', avatar: '🤖', personality: 'friendly' };
const personalityLabels = { friendly: 'Friendly आणि Helpful', funny: 'विनोदी आणि मजेशीर', professional: 'Professional आणि अचूक', caring: 'काळजीवाहू आणि प्रेमळ', wise: 'ज्ञानी आणि शांत', energetic: 'उर्जावान आणि उत्साही' };

function loadProfile() {
    state.profile = JSON.parse(localStorage.getItem('mr_profile') || 'null') || { ...defaultProfile };
}

function openProfileModal() {
    document.getElementById('profileModal').classList.remove('hidden');
    document.getElementById('profileNameInput').value = state.profile.name === 'मराठी Assistant' ? '' : state.profile.name;
    // Set selected avatar
    document.querySelectorAll('.avatar-option').forEach(btn => {
        btn.classList.toggle('selected', btn.dataset.avatar === state.profile.avatar);
    });
    // Set selected personality
    document.querySelectorAll('.personality-option').forEach(btn => {
        btn.classList.toggle('selected', btn.dataset.personality === state.profile.personality);
    });
}

function selectAvatar(el) {
    document.querySelectorAll('.avatar-option').forEach(b => b.classList.remove('selected'));
    el.classList.add('selected');
}

function selectPersonality(el) {
    document.querySelectorAll('.personality-option').forEach(b => b.classList.remove('selected'));
    el.classList.add('selected');
}

function saveProfile() {
    const name = document.getElementById('profileNameInput').value.trim() || 'मराठी Assistant';
    const avatar = document.querySelector('.avatar-option.selected')?.dataset.avatar || '🤖';
    const personality = document.querySelector('.personality-option.selected')?.dataset.personality || 'friendly';

    state.profile = { name, avatar, personality };
    localStorage.setItem('mr_profile', JSON.stringify(state.profile));

    updateProfileUI();
    document.getElementById('profileModalStatus').textContent = '✅ Profile सेव्ह झाले!';
    setTimeout(() => {
        document.getElementById('profileModal').classList.add('hidden');
        document.getElementById('profileModalStatus').textContent = '';
    }, 1500);
}

function updateProfileUI() {
    const p = state.profile;
    // Profile tab
    document.getElementById('profileAvatarLarge').textContent = p.avatar;
    document.getElementById('profileNameDisplay').textContent = p.name;
    document.getElementById('profilePersonalityDisplay').textContent = personalityLabels[p.personality] || 'Friendly';
    // Status
    document.getElementById('profileStatusName').textContent = p.name;
    document.getElementById('profileStatusAvatar').textContent = p.avatar;
    document.getElementById('profileStatusPersonality').textContent = personalityLabels[p.personality] || p.personality;
    // Header title
    document.querySelector('.header h1').innerHTML = `${p.avatar} <span>${p.name}</span>`;
}

function getAssistantAvatar() {
    return state.profile?.avatar || '🤖';
function getAssistantName() {
    return state.profile?.name || 'मराठी Assistant';
}

// ============================================
// Initialize
// ============================================
function loadSettings() {
// Initialize
// ============================================
function loadSettings() {
    if (state.settings.geminiKey) document.getElementById('geminiKey').value = state.settings.geminiKey;
    if (state.settings.weatherKey) document.getElementById('weatherKey').value = state.settings.weatherKey;
    if (state.settings.language) document.getElementById('langSelect').value = state.settings.language;
}

function init() {
    loadProfile();
    initSpeechRecognition();
    loadSettings();
    renderNotes();
    updateProfileUI();

    // Restore device states
    Object.entries(state.devices).forEach(([name, isOn]) => {
        const cards = document.querySelectorAll('.device-card');
        cards.forEach(card => {
            if (card.querySelector('.name')?.textContent === name && isOn) {
                card.classList.add('active');
            }
        });
    });

    // Show first-time setup modal if no profile exists
    if (!localStorage.getItem('mr_profile')) {
        setTimeout(() => openProfileModal(), 1000);
    }
}

// ============================================
// Panel Tabs
// ============================================
function switchTab(tab) {
    document.querySelectorAll('.panel-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.panel-content').forEach(c => c.style.display = 'none');
    event.target.classList.add('active');
    document.getElementById('tab-' + tab).style.display = 'block';
}

function togglePanel(tab) {
    document.querySelectorAll('.panel-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.panel-content').forEach(c => c.style.display = 'none');
    const tabs = document.querySelectorAll('.panel-tab');
    tabs.forEach(t => {
        if (t.textContent.includes(tab === 'settings' ? 'सेटिंग्ज' : tab === 'profile' ? 'Profile' : tab === 'notes' ? 'नोट्स' : 'होम')) {
            t.classList.add('active');
        }
    });
// ============================================
// Quick Actions & Text Input
// ============================================
function sendQuick(text) {
    processUserInput(text);
}

function sendText() {
    const input = document.getElementById('textInput');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    processUserInput(text);
}

init();
</script>

</body>
</html>
