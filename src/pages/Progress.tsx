import { NeuralWeb } from '../components/Progress/NeuralWeb';
import { MomentumCharts } from '../components/Progress/MomentumCharts';

export function Progress() {
  return (
    <div className="h-full w-full flex flex-col p-6 pb-[94px] max-w-md mx-auto gap-[var(--gap-md)]">
      <NeuralWeb />
      <MomentumCharts />
    </div>
  );
}