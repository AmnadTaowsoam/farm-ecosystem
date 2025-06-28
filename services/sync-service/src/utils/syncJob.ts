// src/utils/syncJob.ts
import { edgeDataSource, cloudDataSource } from "./dataSource";
import { SensorData } from "../models/sensorDataModel";

let isSyncing = false;
export async function runSync() {
  if (isSyncing) return;
  isSyncing = true;
  try {
    // Ensure connections
    if (!edgeDataSource.isInitialized) await edgeDataSource.initialize();
    if (!cloudDataSource.isInitialized) await cloudDataSource.initialize();

    // Find latest timestamp in cloud
    const result = await cloudDataSource
      .createQueryBuilder(SensorData, "s")
      .select("MAX(s.time)", "max")
      .getRawOne<{ max: Date }>();
    const lastTime = result?.max ?? new Date(0);

    // Fetch new records from edge
    const newRows: SensorData[] = await edgeDataSource
      .getRepository(SensorData)
      .createQueryBuilder("s")
      .where("s.time > :lastTime", { lastTime })
      .orderBy("s.time", "ASC")
      .getMany();

    if (newRows.length) {
      // Insert into cloud
      await cloudDataSource.getRepository(SensorData).save(newRows, { chunk: 100 });
      console.log(`✅ Synced ${newRows.length} rows (>${lastTime.toISOString()})`);
    } else {
      console.log("ℹ️ No new rows to sync");
    }
  } catch (err) {
    console.error("❌ Sync error:", err);
  } finally {
    isSyncing = false;
  }
}
