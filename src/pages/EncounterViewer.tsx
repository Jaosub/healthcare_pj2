import { useEffect, useState } from "react";
import { fetchEncountersFromFirebase } from "@/services/firebase";

const EncounterViewer = () => {
  const [encounters, setEncounters] = useState<any[]>([]);
  const [filteredEncounters, setFilteredEncounters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchEncountersFromFirebase();
      setEncounters(data);
      setFilteredEncounters(data);
      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    const filtered = encounters.filter((encounter) =>
      encounter.patient_id.includes(searchTerm) ||
      encounter.doctor_id.includes(searchTerm) ||
      encounter.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEncounters(filtered);
  }, [searchTerm, encounters]);

  useEffect(() => {
  const loadData = async () => {
    const data = await fetchEncountersFromFirebase();
    console.log("Firebase data:", data); // ✅ ดูผลลัพธ์ที่ดึงมา
    setEncounters(data);
    setFilteredEncounters(data);
    setLoading(false);
  };
  loadData();
}, []);


const handleSync = async (encounter: any) => {
  try {
    const response = await fetch("http://localhost:3001/api/fromfire/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(encounter),
    });

    const result = await response.json();

    if (response.ok) {
      alert(`✅ Sync สำเร็จ: Firebase ID ${encounter.id}`);
    } else {
      alert(`❌ ล้มเหลว: ${result.error}`);
    }
  } catch (error) {
    console.error("Error syncing:", error);
    alert("❌ เกิดข้อผิดพลาดในการส่งข้อมูล");
  }
};


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">ข้อมูลการรักษาทั้งหมดจาก Firebase</h2>

      <input
        type="text"
        placeholder="ค้นหาโดย Patient ID, Doctor ID หรือ Diagnosis"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />

      {loading ? (
        <p>กำลังโหลดข้อมูล...</p>
      ) : (
        <ul className="space-y-4">
          {filteredEncounters.map((encounter) => (
            <li key={encounter.id} className="border p-4 rounded">
              <p><strong>Patient ID:</strong> {encounter.patient_id}</p>
              <p><strong>Doctor ID:</strong> {encounter.doctor_id}</p>
              <p><strong>Diagnosis:</strong> {encounter.diagnosis}</p>
              <p><strong>Symptoms:</strong> {encounter.symptoms}</p>
              <p><strong>Treatment:</strong> {encounter.treatment}</p>
              <p><strong>Source:</strong> {encounter.source}</p>
              <button
                onClick={() => handleSync(encounter)}
                className="mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Sync to PostgreSQL
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EncounterViewer;
