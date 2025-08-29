import QueryInput from '../components/QueryInput';
import ChartRenderer from '../components/ChartRenderer';
import { appName } from './consts';

export default function Home() {
  return (
    <main className="p-6 space-y-6">
      <div className='w-[50%] justify-self-center py-[4rem]'>
        <h1 className="text-2xl font-bold">
          {appName}
        </h1>
        <QueryInput />
        <ChartRenderer />
      </div>
    </main>
  );
}
