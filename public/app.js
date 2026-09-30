const form = document.getElementById("complaintForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());

  const response = await fetch("/api/complaints", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(data)
  });

  const result = await response.json();
  message.textContent = result.message || result.error;
  message.style.color = response.ok ? "green" : "crimson";

  if (response.ok) {
    form.reset();
    loadComplaints();
  }
});

async function loadComplaints() {
  const response = await fetch("/api/complaints");
  const data = await response.json();

  const counts = {
    total: data.length,
    pending: data.filter(x => x.status === "Pending").length,
    progress: data.filter(x => x.status === "In Progress").length,
    resolved: data.filter(x => x.status === "Resolved").length
  };

  document.getElementById("stats").innerHTML = `
    <div class="stat">Total<strong>${counts.total}</strong></div>
    <div class="stat">Pending<strong>${counts.pending}</strong></div>
    <div class="stat">In Progress<strong>${counts.progress}</strong></div>
    <div class="stat">Resolved<strong>${counts.resolved}</strong></div>
  `;

  document.getElementById("complaints").innerHTML = data.length
    ? data.map(renderComplaint).join("")
    : "<p>No complaints available.</p>";
}

function renderComplaint(c) {
  return `
    <article class="complaint">
      <h3>#${c.id} — ${escapeHtml(c.title)}</h3>
      <div class="meta">${escapeHtml(c.student_name)} (${escapeHtml(c.student_id)}) · ${escapeHtml(c.category)} · ${escapeHtml(c.location)}</div>
      <p>${escapeHtml(c.description)}</p>
      <span class="badge">${escapeHtml(c.priority)} Priority</span>
      <span class="badge">${escapeHtml(c.status)}</span>
      <div class="actions">
        <button onclick="setStatus(${c.id}, 'Pending')">Pending</button>
        <button onclick="setStatus(${c.id}, 'In Progress')">In Progress</button>
        <button onclick="setStatus(${c.id}, 'Resolved')">Resolved</button>
        <button class="secondary" onclick="deleteComplaint(${c.id})">Delete</button>
      </div>
    </article>
  `;
}

async function setStatus(id, status) {
  await fetch(`/api/complaints/${id}/status`, {
    method: "PUT",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({status})
  });
  loadComplaints();
}

async function deleteComplaint(id) {
  if (!confirm("Delete this complaint?")) return;
  await fetch(`/api/complaints/${id}`, {method:"DELETE"});
  loadComplaints();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[c]));
}

loadComplaints();
