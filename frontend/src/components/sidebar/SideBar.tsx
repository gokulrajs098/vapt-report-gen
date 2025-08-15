import { useState, useEffect } from 'react'; // <-- Import useEffect
import { Skull } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// A new, separate component for the sortable items
const SortableVulnerability = ({ page }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: page.pageId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: 'none',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700 transition-colors cursor-grab active:cursor-grabbing"
    >
      <Skull size={18} className="text-gray-400" />
      <p className="truncate">{page.title}</p>
    </div>
  );
};

export default function SideBar({ reportData }) {
  const [vulnerabilityPages, setVulnerabilityPages] = useState([]); // <-- Initialize as an empty array

  useEffect(() => {
    // This effect runs whenever reportData changes
    if (reportData && reportData.pages) {
      setVulnerabilityPages(
        reportData.pages.filter((page) => page.type === 'Vulnerability')
      );
    }
  }, [reportData]); // <-- Dependency array ensures this runs when reportData updates

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setVulnerabilityPages((items) => {
        const oldIndex = items.findIndex(item => item.pageId === active.id);
        const newIndex = items.findIndex(item => item.pageId === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  // Filter out non-vulnerability pages once reportData is available
  const frontMatterPages = reportData?.pages?.filter(
    (page) => page.type === 'Front Matter'
  ) || [];
  const backMatterPages = reportData?.pages?.filter(
    (page) => page.type === 'Back Matter'
  ) || [];

  if (!reportData) {
    return (
      <div className="p-4 bg-gray-900 text-gray-400">
        <p>Loading sidebar...</p>
      </div>
    );
  }

  return (
    <aside className="flex flex-col bg-gray-900 text-gray-200 w-64 h-full p-4 border-r border-gray-700">
      <nav className="overflow-y-auto space-y-4">
        {/* ... (Front Matter and Back Matter sections remain static) ... */}
        <div>
          <h3 className="font-semibold text-lg text-gray-100 mb-2">Header & Footer</h3>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-100 mb-2">Front Matter</h3>
          <div className="space-y-1">
            {frontMatterPages.map((page) => (
              <div
                key={page.pageId}
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <Skull size={18} className="text-gray-400" />
                <p className="truncate">{page.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vulnerabilities Section - Now Draggable */}
        <div>
          <h3 className="font-semibold text-lg text-gray-100 mb-2">Vulnerabilities</h3>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={vulnerabilityPages.map((page) => page.pageId)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-1">
                {vulnerabilityPages.map((page) => (
                  <SortableVulnerability key={page.pageId} page={page} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        {/* Back Matter Section - Static */}
        <div>
          <h3 className="font-semibold text-lg text-gray-100 mb-2">Back Matter</h3>
          <div className="space-y-1">
            {backMatterPages.map((page) => (
              <div
                key={page.pageId}
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <Skull size={18} className="text-gray-400" />
                <p className="truncate">{page.title}</p>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}