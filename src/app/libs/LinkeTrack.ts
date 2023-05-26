import Linketrack from 'linketrackjs';
import { token, user } from '../config/LinkeTrack';

const linketrack: Linketrack = new Linketrack(user, token);
export default linketrack;
