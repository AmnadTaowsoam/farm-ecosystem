// src/routes/index.ts
import { Router } from 'express';

import customerRouter from './customer.route';
import subscriptionsRouter from './subscriptions.route';
import farmsRouter from './farms.route';
import housesRouter from './houses.route';
import deviceGroupRouter from './deviceGroup.route';
import deviceTypesRouter from './deviceType.route';
import devicesRouter from './device.route';
import devicesLogsRouter from './deviceLogs.route';
import deviceStatusHistoryRouter from './deviceStatusHistory.route';
import animalsRouter from './animal.route';
import geneticFactorsRouter from './geneticFactor.route';
import feedBatchesRouter from './feedBatch.route';
import feedBatchAssignmentsRouter from './feedBatchAssign.route';
import feedProgramsRouter from './feedProgram.route';
import feedIntakeRouter from './feedIntake.route';
import feedCompositionRouter from './feedComposition.route';
import envFactorsRouter from './envFactor.route';
import housingConditionsRouter from './housingCondition.route';
import waterQualityRouter from './waterQuality.route';
import healthRecordsRouter from './healthRecord.route';
import welfareIndicatorsRouter from './welfareIndicator.route';
import performanceMetricsRouter from './performanceMetric.route';
import operationRecordsRouter from './operationRecord.route';
import economicDataRouter from './economic.route';
import externalFactorsRouter from './externalFactor.route';
import sensorDataRouter from './sensor.route';

const router = Router();

router.use('/customers',               customerRouter);
router.use('/subscriptions',           subscriptionsRouter);
router.use('/farms',                   farmsRouter);
router.use('/houses',                  housesRouter);
router.use('/devices/device-groups',   deviceGroupRouter);
router.use('/devices/device-types',    deviceTypesRouter);
router.use('/devices/device-logs',     devicesLogsRouter);
router.use('/devices/device-status-history',   deviceStatusHistoryRouter);
router.use('/devices',                 devicesRouter);
router.use('/animals',                 animalsRouter);
router.use('/genetic-factors',         geneticFactorsRouter);
router.use('/feed-batches',            feedBatchesRouter);
router.use('/feed-batch-assignments',  feedBatchAssignmentsRouter);
router.use('/feed-programs',           feedProgramsRouter);
router.use('/feed-intake',             feedIntakeRouter);
router.use('/feed-compositions',       feedCompositionRouter);
router.use('/environmental-factors',   envFactorsRouter);
router.use('/housing-conditions',      housingConditionsRouter);
router.use('/water-quality',           waterQualityRouter);
router.use('/health-records',          healthRecordsRouter);
router.use('/welfare-indicators',      welfareIndicatorsRouter);
router.use('/performance-metrics',     performanceMetricsRouter);
router.use('/operation-records',       operationRecordsRouter);
router.use('/economic-data',           economicDataRouter);
router.use('/external-factors',        externalFactorsRouter);
router.use('/sensor-data',             sensorDataRouter);

export default router;
