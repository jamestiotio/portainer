import { Box, Clock, LayoutGrid, Layers, Puzzle } from 'lucide-react';

import { isBE } from '../portainer/feature-flags/feature-flags.service';
import { useSettings } from '../portainer/settings/queries';

import { SidebarItem } from './SidebarItem';
import { SidebarSection } from './SidebarSection';

export function EdgeComputeSidebar() {
  // this sidebar is rendered only for admins, so we can safely assume that settingsQuery will succeed
  const settingsQuery = useSettings();

  if (!settingsQuery.data || !settingsQuery.data.EnableEdgeComputeFeatures) {
    return null;
  }

  const settings = settingsQuery.data;

  return (
    <SidebarSection title="Edge compute">
      <SidebarItem
        to="edge.groups"
        label="Edge Groups"
        icon={LayoutGrid}
        data-cy="portainerSidebar-edgeGroups"
      />
      <SidebarItem
        to="edge.stacks"
        label="Edge Stacks"
        icon={Layers}
        data-cy="portainerSidebar-edgeStacks"
      />
      <SidebarItem
        to="edge.jobs"
        label="Edge Jobs"
        icon={Clock}
        data-cy="portainerSidebar-edgeJobs"
      />
      {isBE && (
        <SidebarItem
          to="edge.configurations"
          label="Edge Configurations"
          icon={Puzzle}
          data-cy="portainerSidebar-edgeConfigurations"
        />
      )}
      {isBE && !settings.TrustOnFirstConnect && (
        <SidebarItem
          to="edge.devices.waiting-room"
          label="Waiting Room"
          icon={Box}
          data-cy="portainerSidebar-edgeDevicesWaitingRoom"
        />
      )}
    </SidebarSection>
  );
}
