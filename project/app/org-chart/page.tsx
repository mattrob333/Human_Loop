"use client";

import { useState } from "react";
import { AnimatedOrgChart } from "@/components/org-chart/animated-org-chart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PlusCircle, X, Edit2 } from "lucide-react";

interface Role {
  id: string;
  title: string;
  name?: string;
  contact?: string;
  rubric?: string;
  level: number;
  reportingTo?: string;
}

const defaultRoles: Role[] = [
  { id: "ceo", title: "CEO", level: 0 },
  { id: "cto", title: "CTO", level: 1, reportingTo: "ceo" },
  { id: "cro", title: "CRO", level: 1, reportingTo: "ceo" },
  { id: "cmo", title: "CMO", level: 1, reportingTo: "ceo" },
  { id: "eng-mgr-1", title: "Engineering Manager", level: 2, reportingTo: "cto" },
  { id: "eng-mgr-2", title: "Product Manager", level: 2, reportingTo: "cto" },
  { id: "sales-mgr-1", title: "Sales Manager", level: 2, reportingTo: "cro" },
  { id: "sales-mgr-2", title: "Account Manager", level: 2, reportingTo: "cro" },
  { id: "mkt-mgr-1", title: "Marketing Manager", level: 2, reportingTo: "cmo" },
  { id: "mkt-mgr-2", title: "Brand Manager", level: 2, reportingTo: "cmo" },
];

export default function OrgChartPage() {
  const [roles, setRoles] = useState<Role[]>(defaultRoles);
  const [newRole, setNewRole] = useState<Partial<Role>>({
    level: 1,
  });
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const handleAddRole = () => {
    if (!newRole.title) return;

    const id = newRole.title.toLowerCase().replace(/\s+/g, '-');
    
    // If there's already a role with this ID, don't add it
    if (roles.some(role => role.id === id)) return;
    
    // If this is a CEO (level 0), remove any existing CEO
    if (newRole.level === 0) {
      setRoles(prev => prev.filter(role => role.level !== 0));
    }

    setRoles(prev => [...prev, { ...newRole, id } as Role]);
    setNewRole({ level: 1 });
  };

  const handleRemoveRole = (id: string) => {
    setRoles(roles.filter(role => role.id !== id));
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
  };

  const handleUpdateRole = () => {
    if (!editingRole) return;

    setRoles(prev => prev.map(role => 
      role.id === editingRole.id ? editingRole : role
    ));
    setEditingRole(null);
  };

  const getAvailableManagers = (level: number, excludeId?: string) => {
    return roles.filter(role => role.level < level && role.id !== excludeId);
  };

  // Sort roles by hierarchy
  const sortedRoles = [...roles].sort((a, b) => {
    if (a.level !== b.level) return a.level - b.level;
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 p-8">
      <div className="w-full max-w-7xl">
        <h1 className="mb-12 text-center text-3xl font-bold text-neutral-200">
          Visual Org Chart Builder
        </h1>

        {/* Role Management Form */}
        <div className="mb-8 rounded-xl border border-neutral-700 bg-neutral-900/50 backdrop-blur-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="title">Role Title</Label>
              <Input
                id="title"
                value={newRole.title || ''}
                onChange={(e) => setNewRole({ ...newRole, title: e.target.value })}
                placeholder="e.g. Engineering Manager"
              />
            </div>
            <div>
              <Label htmlFor="name">Name (Optional)</Label>
              <Input
                id="name"
                value={newRole.name || ''}
                onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                placeholder="e.g. John Doe"
              />
            </div>
            <div>
              <Label htmlFor="contact">Contact (Optional)</Label>
              <Input
                id="contact"
                value={newRole.contact || ''}
                onChange={(e) => setNewRole({ ...newRole, contact: e.target.value })}
                placeholder="e.g. john@company.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="level">Level</Label>
              <Select
                value={newRole.level?.toString()}
                onValueChange={(value) => setNewRole({ ...newRole, level: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Executive (Level 0)</SelectItem>
                  <SelectItem value="1">C-Suite (Level 1)</SelectItem>
                  <SelectItem value="2">Manager (Level 2)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="reportingTo">Reports To</Label>
              <Select
                value={newRole.reportingTo}
                onValueChange={(value) => setNewRole({ ...newRole, reportingTo: value })}
                disabled={!newRole.level || newRole.level === 0}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select manager" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableManagers(newRole.level || 1).map((manager) => (
                    <SelectItem key={manager.id} value={manager.id}>
                      {manager.title} {manager.name ? `(${manager.name})` : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="rubric">Rubric (Optional)</Label>
              <Input
                id="rubric"
                value={newRole.rubric || ''}
                onChange={(e) => setNewRole({ ...newRole, rubric: e.target.value })}
                placeholder="e.g. Analytical, Growth"
              />
            </div>
          </div>

          <Button onClick={handleAddRole} className="w-full" disabled={!newRole.title || (newRole.level !== 0 && !newRole.reportingTo)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Role
          </Button>

          {/* Current Roles List */}
          <div className="mt-6 space-y-2">
            {sortedRoles.map((role) => (
              <div key={role.id} className="flex items-center justify-between rounded-lg border border-neutral-700 p-3">
                <div className="flex-1">
                  <span className="font-medium text-neutral-200">{role.title}</span>
                  {role.name && <span className="ml-2 text-neutral-400">({role.name})</span>}
                  {role.reportingTo && (
                    <span className="ml-2 text-neutral-500">
                      → Reports to: {roles.find(r => r.id === role.reportingTo)?.title}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditRole(role)}
                    className="text-neutral-400 hover:text-blue-400"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveRole(role.id)}
                    className="text-neutral-400 hover:text-red-400"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Role Dialog */}
        <Dialog open={!!editingRole} onOpenChange={(open) => !open && setEditingRole(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Role</DialogTitle>
            </DialogHeader>
            {editingRole && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-title">Role Title</Label>
                  <Input
                    id="edit-title"
                    value={editingRole.title}
                    onChange={(e) => setEditingRole({ ...editingRole, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-name">Name</Label>
                  <Input
                    id="edit-name"
                    value={editingRole.name || ''}
                    onChange={(e) => setEditingRole({ ...editingRole, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-contact">Contact</Label>
                  <Input
                    id="edit-contact"
                    value={editingRole.contact || ''}
                    onChange={(e) => setEditingRole({ ...editingRole, contact: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-rubric">Rubric</Label>
                  <Input
                    id="edit-rubric"
                    value={editingRole.rubric || ''}
                    onChange={(e) => setEditingRole({ ...editingRole, rubric: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-reports-to">Reports To</Label>
                  <Select
                    value={editingRole.reportingTo}
                    onValueChange={(value) => setEditingRole({ ...editingRole, reportingTo: value })}
                    disabled={editingRole.level === 0}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select manager" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableManagers(editingRole.level, editingRole.id).map((manager) => (
                        <SelectItem key={manager.id} value={manager.id}>
                          {manager.title} {manager.name ? `(${manager.name})` : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleUpdateRole} className="w-full">
                  Save Changes
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Org Chart Visualization */}
        <div className="rounded-xl border border-neutral-700 bg-neutral-900/50 backdrop-blur-sm p-12">
          <AnimatedOrgChart roles={roles} />
        </div>
      </div>
    </div>
  );
}
