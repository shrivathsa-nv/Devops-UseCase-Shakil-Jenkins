<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Jenkins Build Failures & AI Fixes</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f7fc; margin: 0; padding: 20px; }
        header { background-color: #2196F3; color: white; padding: 15px; font-size: 1.8em; text-align: center; }
        table { width: 90%; margin: 20px auto; border-collapse: collapse; }
        th, td { padding: 15px; text-align: left; border: 1px solid #ddd; }
        th { background-color: #1976D2; color: white; text-transform: uppercase; }
        .error-logs { font-family: monospace; color: red; background-color: #ffeeee; padding: 10px; border-radius: 5px; display: none; }
        .ai-recommendation-container { background-color: #222; padding: 15px; color: white; border-radius: 8px; margin-top: 5px; }
        .section-heading { font-weight: bold; color: #ff9800; font-size: 1.2em; }
        .recommendation-content { font-family: Arial, sans-serif; font-size: 1em; color: #d5f3ff; }
        .apply-fix-btn { background-color: #4CAF50; color: white; padding: 10px; border: none; cursor: pointer; margin-top: 10px; }
        .toggle-log-btn { background-color: #f44336; color: white; padding: 8px; border: none; cursor: pointer; }
        pre { background: #282c34; color: #abb2bf; padding: 10px; border-radius: 5px; overflow-x: auto; }
        code { font-family: monospace; }
    </style>
</head>
<body>
    <header>🚀 Jenkins Build Failures & AI Fixes</header>
    <table>
        <thead>
            <tr>
                <th>Build Number</th>
                <th>Status</th>
                <th>Actions</th>
                <th>AI Recommendations</th>
            </tr>
        </thead>
        <tbody>
            <% builds.forEach(build => { %>
                <tr>
                    <td><%= build.number %></td>
                    <td><%= build.result %></td>
                    <td>
                        <button class="toggle-log-btn" onclick="toggleLogs(<%= build.number %>)">👁 Show/Hide Logs</button>
                        <div class="error-logs" id="log-<%= build.number %>">
                            <strong>🔍 Full Error Log:</strong><br>
                            <pre><code><%= build.errors.join("\n") %></code></pre>
                        </div>
                    </td>
                    <td>
                        <div class="ai-recommendation-container">
                            <span class="section-heading">💡 AI Full Response</span>
                            <div class="recommendation-content">
                                <%- build.aiFullResponse.replace(/(?:\r\n|\r|\n)/g, "<br>") %>
                            </div>
                        </div>
                        <div class="ai-recommendation-container">
                            <span class="section-heading">📝 AI-Suggested Jenkinsfile Fix</span>
                            <pre><code><%= build.aiJenkinsfile %></code></pre>
                        </div>
                        <% if (build.aiJenkinsfile.includes("pipeline")) { %>
                            <button class="apply-fix-btn" onclick="applyFix(<%= build.number %>)">✅ Apply Fix</button>
                        <% } %>
                    </td>
                </tr>
            <% }) %>
        </tbody>
    </table>

    <script>
        function toggleLogs(buildNumber) {
            const logElement = document.getElementById(`log-${buildNumber}`);
            logElement.style.display = logElement.style.display === "none" ? "block" : "none";
        }

        function applyFix(buildNumber) {
            alert("Applying fix for build #" + buildNumber);
            fetch(`/apply-fix/${buildNumber}`, { method: 'POST' })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                alert(data.message);
                location.reload();
            })
            .catch(error => {
                console.error("❌ Error applying fix:", error);
                alert(`❌ Failed to apply fix: ${error.message}`);
            });
        }
    </script>
</body>
</html>
