import {
	ArrowDown,
	ArrowRight,
	ArrowUp,
	CheckCircle,
	Circle,
	Cross,
	FileQuestion,
	StopCircle
} from 'lucide-svelte';

export const labels = [
	{
		value: 'bug',
		label: 'Bug'
	},
	{
		value: 'feature',
		label: 'Feature'
	},
	{
		value: 'documentation',
		label: 'Documentation'
	}
];

export const statuses = [
	{
		value: 'backlog',
		label: 'Backlog',
		icon: FileQuestion
	},
	{
		value: 'todo',
		label: 'Todo',
		icon: Circle
	},
	{
		value: 'in progress',
		label: 'In Progress',
		icon: Cross
	},
	{
		value: 'done',
		label: 'Done',
		icon: CheckCircle
	},
	{
		value: 'canceled',
		label: 'Canceled',
		icon: StopCircle
	}
];

export const priorities = [
	{
		label: 'Low',
		value: 'low',
		icon: ArrowDown
	},
	{
		label: 'Medium',
		value: 'medium',
		icon: ArrowRight
	},
	{
		label: 'High',
		value: 'high',
		icon: ArrowUp
	}
];
