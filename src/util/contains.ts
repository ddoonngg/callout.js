import * as React from 'react';

export default function contains(root: Node | null | undefined, node?: Node): boolean {
  if (!root) {
    return false;
  }
  return root.contains(node);
}
