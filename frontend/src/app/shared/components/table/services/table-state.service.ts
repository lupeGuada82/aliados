import { Injectable } from '@angular/core';

@Injectable()
export class TableStateService {

  private editingRows = new Set<string>();
  private addingRows = new Set<string>();
  private originalRows = new Map<string, any>();

  startEditing(row: any): void {
    this.editingRows.add(row.__uid);
  }

  stopEditing(row: any): void {
    this.editingRows.delete(row.__uid);
  }

  isEditing(row: any): boolean {
    return this.editingRows.has(row.__uid);
  }

  startAdding(row: any): void {
    this.addingRows.add(row.__uid);
  }

  stopAdding(row: any): void {
    this.addingRows.delete(row.__uid);
  }

  saveOriginal(row: any): void {
    this.originalRows.set(row.__uid, { ...row });
  }

  getOriginal(row: any): any | undefined {
    return this.originalRows.get(row.__uid);
  }

  clearOriginal(row: any): void {
    this.originalRows.delete(row.__uid);
  }

  hasEditing() {
    return this.editingRows.size > 0;
  }

  hasAdding() {
    return this.addingRows.size > 0;
  }
}