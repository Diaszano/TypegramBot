import Queue from 'bull';
import jobConfig from '../config/Job';

const maxProcessesPerMinute = 60;

const updateTrack = new Queue(
  'Atualização do Rastreio de encomenda',
  jobConfig,
);

const UpdateTrackJob = (code: string) => {
  return updateTrack.add(code);
};

updateTrack.process(async (job): Promise<void> => {});
