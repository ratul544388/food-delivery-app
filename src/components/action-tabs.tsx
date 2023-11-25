'use client';
interface ActionTabsProps {
  tabs: string[];
  value: string;
}

const ActionTabs: React.FC<ActionTabsProps> = ({
    tabs,
    value,
}) => {
  return (
     <div defaultValue={value}>
        <div>
            
        </div>
     </div>
    );
}

export default ActionTabs