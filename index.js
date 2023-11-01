import { registerRootComponent } from 'expo';
import Root from './src/Root';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

registerRootComponent(Root);
