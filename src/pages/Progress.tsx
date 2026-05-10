import { NeuralWeb } from '../components/Progress/NeuralWeb';
import { MomentumCharts } from '../components/Progress/MomentumCharts';
import { useProgressData } from '../hooks/useProgressData';

export function Progress() {
  const { allDays, perfectDays, consistency } = useProgressData();

  return (
    <div className="h-full w-full flex flex-col p-6 pb-[94px] max-w-md mx-auto gap-[var(--gap-md)]">
      <NeuralWeb allDays={allDays} />
      <MomentumCharts 
        allDays={allDays} 
        perfectDays={perfectDays} 
        consistency={consistency} 
      />
    </div>
  );
}