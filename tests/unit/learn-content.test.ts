import { describe, expect, it } from "vitest";
import {
  learnNodeMap,
  desktopFolders,
  navItems,
  rootDesktopIds,
  getNodePath,
  getChildNodes,
  searchNodes,
  isDesktopFolderId,
  getRootFolderId,
  applications,
  applicationMap,
  searchApplications,
  widgets,
} from "@/content/learn";

describe("learn content", () => {
  describe("learnNodeMap", () => {
    it("contains all nodes indexed by id", () => {
      expect(learnNodeMap.size).toBeGreaterThan(0);
      for (const [id, node] of learnNodeMap) {
        expect(node.id).toBe(id);
      }
    });

    it("has both en and ar names for every node", () => {
      for (const [, node] of learnNodeMap) {
        expect(node.name.en).toBeTruthy();
        expect(node.name.ar).toBeTruthy();
      }
    });

    it("has valid parent references", () => {
      for (const [, node] of learnNodeMap) {
        if (node.parentId) {
          expect(learnNodeMap.has(node.parentId)).toBe(true);
        }
      }
    });

    it("has valid child references", () => {
      for (const [, node] of learnNodeMap) {
        for (const childId of node.children) {
          expect(learnNodeMap.has(childId)).toBe(true);
        }
      }
    });

    it("parent-child relationships are bidirectional", () => {
      for (const [, node] of learnNodeMap) {
        for (const childId of node.children) {
          const child = learnNodeMap.get(childId);
          expect(child?.parentId).toBe(node.id);
        }
      }
    });
  });

  describe("desktopFolders", () => {
    it("returns exactly rootDesktopIds items", () => {
      expect(desktopFolders).toHaveLength(rootDesktopIds.length);
    });

    it("all folders have type 'folder'", () => {
      for (const folder of desktopFolders) {
        expect(folder.type).toBe("folder");
      }
    });

    it("contains the This PC root", () => {
      const ids = desktopFolders.map((f) => f.id);
      expect(ids).toContain("this-pc");
    });
  });

  describe("navItems", () => {
    it("has desktop, folders, this-pc, and return entries", () => {
      const ids = navItems.map((n) => n.id);
      expect(ids).toContain("__desktop__");
      expect(ids).toContain("__thispc__");
      expect(ids).toContain("__return__");
    });
  });

  describe("getNodePath", () => {
    it("returns a single-element path for root nodes", () => {
      const path = getNodePath("this-pc", learnNodeMap);
      expect(path).toHaveLength(1);
      expect(path[0]!.id).toBe("this-pc");
    });

    it("returns correct ancestor chain for a nested node", () => {
      const nestedNode = Array.from(learnNodeMap.values()).find(
        (n) => n.parentId !== null && n.type === "file",
      );
      if (!nestedNode) return;

      const path = getNodePath(nestedNode.id, learnNodeMap);
      expect(path.length).toBeGreaterThanOrEqual(2);
      expect(path[0]!.id).toBe("this-pc");
      expect(path[path.length - 1]!.id).toBe(nestedNode.id);
    });

    it("returns empty array for unknown node", () => {
      const path = getNodePath("nonexistent", learnNodeMap);
      expect(path).toHaveLength(0);
    });
  });

  describe("getChildNodes", () => {
    it("returns children of a folder", () => {
      const children = getChildNodes("this-pc", learnNodeMap);
      expect(children.length).toBeGreaterThan(0);
      for (const child of children) {
        expect(child.parentId).toBe("this-pc");
      }
    });

    it("returns empty array for unknown parent", () => {
      const children = getChildNodes("nonexistent", learnNodeMap);
      expect(children).toHaveLength(0);
    });

    it("returns empty array for a file node with no children", () => {
      const fileNode = Array.from(learnNodeMap.values()).find(
        (n) => n.type === "file" && n.children.length === 0,
      );
      if (!fileNode) return;

      const children = getChildNodes(fileNode.id, learnNodeMap);
      expect(children).toHaveLength(0);
    });
  });

  describe("searchNodes", () => {
    it("finds nodes by name", () => {
      const results = searchNodes("nour", learnNodeMap, "en");
      expect(results.length).toBeGreaterThan(0);
      expect(
        results.some((r) => r.name.en.toLowerCase().includes("nour")),
      ).toBe(true);
    });

    it("finds nodes by tag", () => {
      const results = searchNodes("javascript", learnNodeMap, "en");
      expect(results.length).toBeGreaterThan(0);
    });

    it("finds nodes by summary content", () => {
      const firstFile = Array.from(learnNodeMap.values()).find(
        (n) => n.type === "file" && n.public,
      );
      if (!firstFile) return;

      const firstWord = firstFile.summary.en.split(" ")[0]?.toLowerCase();
      if (!firstWord || firstWord.length < 3) return;

      const results = searchNodes(firstWord, learnNodeMap, "en");
      expect(results.some((r) => r.id === firstFile.id)).toBe(true);
    });

    it("excludes non-public nodes", () => {
      const results = searchNodes("private-test-query-xyz", learnNodeMap, "en");
      for (const r of results) {
        expect(r.public).toBe(true);
      }
    });

    it("is case-insensitive", () => {
      const lower = searchNodes("nour", learnNodeMap, "en");
      const upper = searchNodes("NOUR", learnNodeMap, "en");
      expect(lower.length).toBe(upper.length);
    });

    it("returns empty for no matches", () => {
      const results = searchNodes("zzzyyyxxxnotfound", learnNodeMap, "en");
      expect(results).toHaveLength(0);
    });

    it("searches in Arabic locale", () => {
      const results = searchNodes("نور", learnNodeMap, "ar");
      expect(results.length).toBeGreaterThan(0);
    });
  });

  describe("isDesktopFolderId", () => {
    it("returns true for valid desktop folder ids", () => {
      expect(isDesktopFolderId("this-pc")).toBe(true);
      expect(isDesktopFolderId("knowledge")).toBe(true);
    });

    it("returns false for non-desktop ids", () => {
      expect(isDesktopFolderId("nonexistent")).toBe(false);
      expect(isDesktopFolderId("")).toBe(false);
    });
  });

  describe("getRootFolderId", () => {
    it("returns this-pc", () => {
      expect(getRootFolderId()).toBe("this-pc");
    });
  });

  describe("applications", () => {
    it("has 10 applications", () => {
      expect(applications).toHaveLength(10);
    });

    it("each application has required fields", () => {
      for (const app of applications) {
        expect(app.id).toBeTruthy();
        expect(app.name).toBeTruthy();
        expect(app.category).toBeTruthy();
        expect(app.summary).toBeTruthy();
        expect(app.description).toBeTruthy();
        expect(Array.isArray(app.usedFor)).toBe(true);
        expect(app.usedFor.length).toBeGreaterThan(0);
        expect(Array.isArray(app.tags)).toBe(true);
        expect(app.tags.length).toBeGreaterThan(0);
      }
    });

    it("applicationMap contains all applications by id", () => {
      for (const app of applications) {
        expect(applicationMap.get(app.id)).toBe(app);
      }
    });

    it("applicationMap does not contain unknown ids", () => {
      expect(applicationMap.get("nonexistent")).toBeUndefined();
    });
  });

  describe("searchApplications", () => {
    it("finds applications by name", () => {
      const results = searchApplications("Visual Studio");
      expect(results.length).toBe(1);
      expect(results[0]!.id).toBe("app-vscode");
    });

    it("finds applications by tag", () => {
      const results = searchApplications("database");
      expect(results.length).toBeGreaterThan(0);
    });

    it("finds applications by category", () => {
      const results = searchApplications("3D");
      expect(results.length).toBeGreaterThan(0);
    });

    it("is case-insensitive", () => {
      const lower = searchApplications("obsidian");
      const upper = searchApplications("OBSIDIAN");
      expect(lower.length).toBe(upper.length);
    });

    it("returns empty for no matches", () => {
      const results = searchApplications("zzzyyyxxxnotfound");
      expect(results).toHaveLength(0);
    });
  });

  describe("widgets", () => {
    it("has 4 widgets", () => {
      expect(widgets).toHaveLength(4);
    });

    it("each widget has required fields", () => {
      for (const widget of widgets) {
        expect(widget.id).toBeTruthy();
        expect(widget.title).toBeTruthy();
        expect(widget.variant).toBeTruthy();
        expect(widget.content).toBeTruthy();
      }
    });

    it("has exactly one large, two small, and one wide layout", () => {
      const large = widgets.filter((w) => w.layout === "large");
      const small = widgets.filter((w) => w.layout === "small");
      const wide = widgets.filter((w) => w.layout === "wide");
      expect(large).toHaveLength(1);
      expect(small).toHaveLength(2);
      expect(wide).toHaveLength(1);
    });

    it("widgets with openFileId reference valid nodes", () => {
      for (const widget of widgets) {
        if (widget.openFileId) {
          expect(learnNodeMap.has(widget.openFileId)).toBe(true);
        }
      }
    });

    it("widgets with openFolderId reference valid nodes", () => {
      for (const widget of widgets) {
        if (widget.openFolderId) {
          expect(learnNodeMap.has(widget.openFolderId)).toBe(true);
        }
      }
    });
  });

  describe("apps folder in tree", () => {
    it("rootDesktopIds includes apps", () => {
      expect(rootDesktopIds).toContain("apps");
    });

    it("apps folder exists in node map", () => {
      const appsFolder = learnNodeMap.get("apps");
      expect(appsFolder).toBeDefined();
      expect(appsFolder!.type).toBe("folder");
      expect(appsFolder!.parentId).toBe("this-pc");
    });

    it("apps folder has 10 application children", () => {
      const children = getChildNodes("apps", learnNodeMap);
      expect(children).toHaveLength(10);
      for (const child of children) {
        expect(child.type).toBe("file");
        expect(child.parentId).toBe("apps");
      }
    });

    it("each application folder has the same id as its application entry", () => {
      const children = getChildNodes("apps", learnNodeMap);
      const appIds = applications.map((a) => a.id);
      for (const child of children) {
        expect(appIds).toContain(child.id);
      }
    });
  });
});
