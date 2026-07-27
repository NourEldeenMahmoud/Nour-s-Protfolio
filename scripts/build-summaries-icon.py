import json
import struct
import math
import os

def create_summaries_glb(output_path):
    # Front material (IconFront_Champagne)
    # Side material (IconSide_Bronze)
    materials = [
        {
            "name": "IconFront_Champagne",
            "pbrMetallicRoughness": {
                "baseColorFactor": [0.7799999713897705, 0.6200000047683716, 0.4000000059604645, 1.0],
                "metallicFactor": 0.41999998688697815,
                "roughnessFactor": 0.3400000035762787
            }
        },
        {
            "name": "IconSide_Bronze",
            "pbrMetallicRoughness": {
                "baseColorFactor": [0.1599999964237213, 0.11999999731779099, 0.10000000149011612, 1.0],
                "metallicFactor": 0.41999998688697815,
                "roughnessFactor": 0.41999998688697815
            }
        }
    ]

    front_verts = []
    front_norms = []
    front_indices = []

    side_verts = []
    side_norms = []
    side_indices = []

    def add_quad(v0, v1, v2, v3, norm, is_front):
        target_v = front_verts if is_front else side_verts
        target_n = front_norms if is_front else side_norms
        target_i = front_indices if is_front else side_indices

        base = len(target_v)
        target_v.extend([v0, v1, v2, v3])
        target_n.extend([norm, norm, norm, norm])
        target_i.extend([base, base + 1, base + 2, base, base + 2, base + 3])

    def add_extruded_polygon_2d(pts, z_front, z_back):
        # pts is a list of (x, y) defining a 2D counter-clockwise polygon
        # Front face (+z)
        front_norm = [0.0, 0.0, 1.0]
        # Triangulate simple convex/star polygon using fan from center
        cx = sum(p[0] for p in pts) / len(pts)
        cy = sum(p[1] for p in pts) / len(pts)
        
        # Front surface
        for i in range(len(pts)):
            p1 = pts[i]
            p2 = pts[(i + 1) % len(pts)]
            v0 = [cx, cy, z_front]
            v1 = [p1[0], p1[1], z_front]
            v2 = [p2[0], p2[1], z_front]
            base = len(front_verts)
            front_verts.extend([v0, v1, v2])
            front_norms.extend([front_norm, front_norm, front_norm])
            front_indices.extend([base, base + 1, base + 2])

        # Back surface (-z)
        back_norm = [0.0, 0.0, -1.0]
        for i in range(len(pts)):
            p1 = pts[i]
            p2 = pts[(i + 1) % len(pts)]
            v0 = [cx, cy, z_back]
            v1 = [p2[0], p2[1], z_back]
            v2 = [p1[0], p1[1], z_back]
            base = len(side_verts)
            side_verts.extend([v0, v1, v2])
            side_norms.extend([back_norm, back_norm, back_norm])
            side_indices.extend([base, base + 1, base + 2])

        # Extruded sides
        for i in range(len(pts)):
            p1 = pts[i]
            p2 = pts[(i + 1) % len(pts)]
            dx = p2[0] - p1[0]
            dy = p2[1] - p1[1]
            length = math.hypot(dx, dy)
            if length == 0:
                continue
            # Normal pointing outwards
            nx = dy / length
            ny = -dx / length
            side_norm = [nx, ny, 0.0]

            v0 = [p1[0], p1[1], z_front]
            v1 = [p2[0], p2[1], z_front]
            v2 = [p2[0], p2[1], z_back]
            v3 = [p1[0], p1[1], z_back]
            add_quad(v0, v1, v2, v3, side_norm, is_front=False)

    # 1. Left Book Cover / Backing
    left_cover = [
        (-0.52, -0.42),
        (-0.04, -0.46),
        (-0.04, 0.44),
        (-0.52, 0.48)
    ]
    add_extruded_polygon_2d(left_cover, z_front=0.04, z_back=-0.06)

    # 2. Right Book Cover / Backing
    right_cover = [
        (0.04, -0.46),
        (0.52, -0.42),
        (0.52, 0.48),
        (0.04, 0.44)
    ]
    add_extruded_polygon_2d(right_cover, z_front=0.04, z_back=-0.06)

    # 3. Spine Center Block
    spine = [
        (-0.04, -0.46),
        (0.04, -0.46),
        (0.04, 0.44),
        (-0.04, 0.44)
    ]
    add_extruded_polygon_2d(spine, z_front=0.02, z_back=-0.065)

    # 4. Left Open Pages Stack
    left_pages = [
        (-0.48, -0.38),
        (-0.05, -0.42),
        (-0.05, 0.40),
        (-0.48, 0.44)
    ]
    add_extruded_polygon_2d(left_pages, z_front=0.065, z_back=0.04)

    # 5. Right Open Pages Stack
    right_pages = [
        (0.05, -0.42),
        (0.48, -0.38),
        (0.48, 0.44),
        (0.05, 0.40)
    ]
    add_extruded_polygon_2d(right_pages, z_front=0.065, z_back=0.04)

    # 6. Notes / Summary Cutout Lines on Left Page
    for y_center in [0.28, 0.16, 0.04, -0.08, -0.20]:
        line_poly = [
            (-0.42, y_center - 0.025),
            (-0.12, y_center - 0.025),
            (-0.12, y_center + 0.025),
            (-0.42, y_center + 0.025)
        ]
        add_extruded_polygon_2d(line_poly, z_front=0.075, z_back=0.065)

    # 7. Notes / Summary Cutout Lines on Right Page
    for y_center in [0.28, 0.16, 0.04, -0.08, -0.20]:
        line_poly = [
            (0.12, y_center - 0.025),
            (0.42, y_center - 0.025),
            (0.42, y_center + 0.025),
            (0.12, y_center + 0.025)
        ]
        add_extruded_polygon_2d(line_poly, z_front=0.075, z_back=0.065)

    # 8. Hanging Bookmark Ribbon in the Middle
    bookmark = [
        (-0.035, -0.48),
        (0.035, -0.48),
        (0.035, 0.15),
        (-0.035, 0.15)
    ]
    add_extruded_polygon_2d(bookmark, z_front=0.08, z_back=0.065)

    # Bookmark Tail Triangle
    bookmark_tail = [
        (-0.035, -0.48),
        (0.0, -0.54),
        (0.035, -0.48)
    ]
    add_extruded_polygon_2d(bookmark_tail, z_front=0.08, z_back=0.065)

    # Build binary buffer data
    buffer_bytes = bytearray()

    def pack_accessor_data(verts, norms, indices):
        # Alignment to 4-byte boundaries
        v_offset = len(buffer_bytes)
        for v in verts:
            buffer_bytes.extend(struct.pack('<fff', v[0], v[1], v[2]))
        v_len = len(buffer_bytes) - v_offset

        # Pad to 4 bytes
        while len(buffer_bytes) % 4 != 0:
            buffer_bytes.append(0)

        n_offset = len(buffer_bytes)
        for n in norms:
            buffer_bytes.extend(struct.pack('<fff', n[0], n[1], n[2]))
        n_len = len(buffer_bytes) - n_offset

        while len(buffer_bytes) % 4 != 0:
            buffer_bytes.append(0)

        i_offset = len(buffer_bytes)
        for idx in indices:
            buffer_bytes.extend(struct.pack('<H', idx))
        i_len = len(buffer_bytes) - i_offset

        while len(buffer_bytes) % 4 != 0:
            buffer_bytes.append(0)

        return (v_offset, v_len, n_offset, n_len, i_offset, i_len)

    f_v_off, f_v_len, f_n_off, f_n_len, f_i_off, f_i_len = pack_accessor_data(front_verts, front_norms, front_indices)
    s_v_off, s_v_len, s_n_off, s_n_len, s_i_off, s_i_len = pack_accessor_data(side_verts, side_norms, side_indices)

    # Calculate min/max for position accessors
    def get_min_max(verts):
        min_v = [min(v[i] for v in verts) for i in range(3)]
        max_v = [max(v[i] for v in verts) for i in range(3)]
        return min_v, max_v

    f_min, f_max = get_min_max(front_verts)
    s_min, s_max = get_min_max(side_verts)

    buffer_views = [
        # 0: Front Vertices
        {"buffer": 0, "byteOffset": f_v_off, "byteLength": f_v_len, "target": 34962},
        # 1: Front Normals
        {"buffer": 0, "byteOffset": f_n_off, "byteLength": f_n_len, "target": 34962},
        # 2: Front Indices
        {"buffer": 0, "byteOffset": f_i_off, "byteLength": f_i_len, "target": 34963},
        # 3: Side Vertices
        {"buffer": 0, "byteOffset": s_v_off, "byteLength": s_v_len, "target": 34962},
        # 4: Side Normals
        {"buffer": 0, "byteOffset": s_n_off, "byteLength": s_n_len, "target": 34962},
        # 5: Side Indices
        {"buffer": 0, "byteOffset": s_i_off, "byteLength": s_i_len, "target": 34963},
    ]

    accessors = [
        # 0: Front Position
        {"bufferView": 0, "byteOffset": 0, "componentType": 5126, "count": len(front_verts), "type": "VEC3", "min": f_min, "max": f_max},
        # 1: Front Normal
        {"bufferView": 1, "byteOffset": 0, "componentType": 5126, "count": len(front_norms), "type": "VEC3"},
        # 2: Front Indices
        {"bufferView": 2, "byteOffset": 0, "componentType": 5123, "count": len(front_indices), "type": "SCALAR"},
        # 3: Side Position
        {"bufferView": 3, "byteOffset": 0, "componentType": 5126, "count": len(side_verts), "type": "VEC3", "min": s_min, "max": s_max},
        # 4: Side Normal
        {"bufferView": 4, "byteOffset": 0, "componentType": 5126, "count": len(side_norms), "type": "VEC3"},
        # 5: Side Indices
        {"bufferView": 5, "byteOffset": 0, "componentType": 5123, "count": len(side_indices), "type": "SCALAR"},
    ]

    primitives = [
        {
            "attributes": {"POSITION": 0, "NORMAL": 1},
            "indices": 2,
            "material": 0
        },
        {
            "attributes": {"POSITION": 3, "NORMAL": 4},
            "indices": 5,
            "material": 1
        }
    ]

    gltf_json = {
        "asset": {"version": "2.0", "generator": "Antigravity Summaries GLB Generator"},
        "scene": 0,
        "scenes": [{"name": "Scene", "nodes": [0]}],
        "nodes": [{"name": "showcase_icon_summaries", "mesh": 0}],
        "meshes": [{"name": "showcase_icon_summaries", "primitives": primitives}],
        "materials": materials,
        "bufferViews": buffer_views,
        "accessors": accessors,
        "buffers": [{"byteLength": len(buffer_bytes)}]
    }

    json_str = json.dumps(gltf_json, separators=(',', ':'))
    json_bytes = json_str.encode('utf-8')
    while len(json_bytes) % 4 != 0:
        json_bytes += b' '

    chunk0_hdr = struct.pack('<I4s', len(json_bytes), b'JSON')
    chunk1_hdr = struct.pack('<I4s', len(buffer_bytes), b'BIN\x00')

    total_size = 12 + 8 + len(json_bytes) + 8 + len(buffer_bytes)
    header = struct.pack('<III', 0x46546C67, 2, total_size)

    with open(output_path, 'wb') as f:
        f.write(header)
        f.write(chunk0_hdr)
        f.write(json_bytes)
        f.write(chunk1_hdr)
        f.write(buffer_bytes)

    print(f"Successfully generated {output_path} ({total_size} bytes)")

if __name__ == '__main__':
    out_file = os.path.join('public', 'models', 'showcase-icons', 'summaries.glb')
    create_summaries_glb(out_file)
