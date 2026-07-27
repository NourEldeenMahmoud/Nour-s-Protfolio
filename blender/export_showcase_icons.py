"""Export the five Explore category icons for the R3F overlay.

Run from Blender with Nour_Engineering_Room.blend open. Source curves use X/Y
for the face and Z for depth. Blender's glTF exporter converts Z-up coordinates
to glTF Y-up, so this exporter pre-rotates the evaluated geometry into X/Z with
-Y depth. The resulting GLB reaches Three.js with X/Y faces and Z depth. It also
centers each mesh, normalizes it to one unit high, recalculates outward normals,
and assigns separate front and side materials before export.
"""

from pathlib import Path

import bmesh
import bpy
from mathutils import Matrix, Vector


PROJECT_ROOT = Path(bpy.data.filepath).parent.parent
OUTPUT_DIR = PROJECT_ROOT / "public" / "models" / "showcase-icons"
SOURCE_ROOTS = {
    "web": "SHOW_Icon_WEB",
    "game-development": "SHOW_Icon_GAME",
    "desktop": "SHOW_Icon_DESKTOP",
    "mobile-applications": "SHOW_Icon_MOBILE",
    "bots": "SHOW_Icon_BOTS",
}
GLTF_Y_UP_PRE_ROTATION = Matrix.Rotation(1.5707963267948966, 4, "X")


def make_material(name: str, color: tuple[float, float, float, float], roughness: float):
    material = bpy.data.materials.new(name)
    material.diffuse_color = color
    material.use_nodes = True
    shader = material.node_tree.nodes.get("Principled BSDF")
    shader.inputs["Base Color"].default_value = color
    shader.inputs["Metallic"].default_value = 0.42
    shader.inputs["Roughness"].default_value = roughness
    return material


def evaluated_mesh(source: bpy.types.Object, depsgraph: bpy.types.Depsgraph):
    evaluated = source.evaluated_get(depsgraph)
    mesh = bpy.data.meshes.new_from_object(evaluated, depsgraph=depsgraph)
    mesh.transform(source.matrix_world)
    return mesh


def join_meshes(meshes: list[bpy.types.Mesh], name: str):
    joined = bpy.data.meshes.new(name)
    bm = bmesh.new()
    for mesh in meshes:
        bm.from_mesh(mesh)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(joined)
    bm.free()
    for mesh in meshes:
        bpy.data.meshes.remove(mesh)
    return joined


def center_and_normalize(mesh: bpy.types.Mesh):
    mesh.transform(GLTF_Y_UP_PRE_ROTATION)
    minimum = Vector((min(v.co.x for v in mesh.vertices), min(v.co.y for v in mesh.vertices), min(v.co.z for v in mesh.vertices)))
    maximum = Vector((max(v.co.x for v in mesh.vertices), max(v.co.y for v in mesh.vertices), max(v.co.z for v in mesh.vertices)))
    center = (minimum + maximum) * 0.5
    height = maximum.z - minimum.z
    mesh.transform(Matrix.Translation(-center))
    mesh.transform(Matrix.Scale(1.0 / height, 4))
    mesh.update()


def assign_front_and_side_materials(mesh: bpy.types.Mesh, front, side):
    mesh.materials.append(front)
    mesh.materials.append(side)
    for polygon in mesh.polygons:
        # After the Y-up pre-rotation, Blender Y becomes glTF/Three.js Z.
        polygon.material_index = 0 if abs(polygon.normal.y) >= 0.25 else 1
        polygon.use_smooth = True


def export_icon(icon_id: str, source_name: str, front, side):
    source_root = bpy.data.objects[source_name]
    depsgraph = bpy.context.evaluated_depsgraph_get()
    child_meshes = [
        evaluated_mesh(child, depsgraph)
        for child in source_root.children_recursive
        if child.type in {"CURVE", "MESH"}
    ]
    mesh = join_meshes(child_meshes, f"{icon_id}_mesh")
    center_and_normalize(mesh)
    assign_front_and_side_materials(mesh, front, side)

    export_object = bpy.data.objects.new(f"showcase_icon_{icon_id}", mesh)
    bpy.context.scene.collection.objects.link(export_object)
    bpy.ops.object.select_all(action="DESELECT")
    export_object.select_set(True)
    bpy.context.view_layer.objects.active = export_object

    output_path = OUTPUT_DIR / f"{icon_id}.glb"
    bpy.ops.export_scene.gltf(
        filepath=str(output_path),
        export_format="GLB",
        use_selection=True,
        export_apply=True,
        export_normals=True,
        export_materials="EXPORT",
        export_yup=True,
    )
    dimensions = export_object.dimensions
    print(
        f"[showcase-icons] {icon_id}: "
        f"{dimensions.x:.6f} x {dimensions.y:.6f} x {dimensions.z:.6f}, "
        f"{len(mesh.vertices)} vertices, {len(mesh.polygons)} polygons -> {output_path}"
    )

    bpy.data.objects.remove(export_object, do_unlink=True)
    bpy.data.meshes.remove(mesh)


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    front = make_material("IconFront_Champagne", (0.78, 0.62, 0.40, 1.0), 0.34)
    side = make_material("IconSide_Bronze", (0.16, 0.12, 0.10, 1.0), 0.42)
    try:
        for icon_id, source_name in SOURCE_ROOTS.items():
            export_icon(icon_id, source_name, front, side)
    finally:
        bpy.data.materials.remove(front)
        bpy.data.materials.remove(side)


if __name__ == "__main__":
    main()
