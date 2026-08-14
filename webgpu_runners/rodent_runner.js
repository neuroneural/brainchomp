
const rodent = (() => {
const getTensorBuffer = (safetensorBuffer, tensorMetadata) => {
  return safetensorBuffer.subarray(...tensorMetadata.data_offsets);
};

const getTensorMetadata = (safetensorBuffer) => {
    const metadataLength = Number(new DataView(safetensorBuffer.buffer).getBigUint64(0, true));
    const metadata = JSON.parse(new TextDecoder("utf8").decode(safetensorBuffer.subarray(8, 8 + metadataLength)));
    return Object.fromEntries(Object.entries(metadata).filter(([k, v]) => k !== "__metadata__").map(([k, v]) => [k, {...v, data_offsets: v.data_offsets.map(x => 8 + metadataLength + x)}]));
};

const createEmptyBuf = (device, size) => {
    return device.createBuffer({size, usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST });
};

const createUniformBuf = (device, size) => {
  return device.createBuffer({size, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST})
}

const createInfinityUniformBuf = (device) => {
  const size = 4;
  const buf = device.createBuffer({
    mappedAtCreation: true,
    size,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST
  });
  new Float32Array(buf.getMappedRange())[0] = Infinity;
  buf.unmap();
  return buf;
};

const createWeightBuf = (device, size, data) => {
  // WebGPU requires buffer size to be multiple of 4 when mappedAtCreation is true
  const paddedSize = Math.ceil(size / 4) * 4;
  const buf = device.createBuffer({ size: paddedSize, usage: GPUBufferUsage.STORAGE, mappedAtCreation: true });
  new Uint8Array(buf.getMappedRange()).set(data); buf.unmap();
  return buf;
};

const addComputePass = (device, commandEncoder, pipeline, layout, infinityUniformBuf, bufs, workgroup) => {
  const bindGroup = device.createBindGroup({
    layout: layout,
    entries: [
      { binding: 0, resource: { buffer: infinityUniformBuf } },
      ...bufs.map((buffer, index) => ({ binding: index + 1, resource: { buffer } }))
    ]
  });

  const passEncoder = commandEncoder.beginComputePass();
  passEncoder.setPipeline(pipeline);
  passEncoder.setBindGroup(0, bindGroup);
  passEncoder.dispatchWorkgroups(...workgroup);
  passEncoder.end();
};

const r_4_256_32_4_8_16_4_4_3_3_3n1 = `enable f16;
fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0_268435456:array<f16>;
@group(0) @binding(2)var<storage,read_write>data1_16777216:array<f16>;
@group(0) @binding(3)var<storage,read_write>data2_432:array<f16>;
@compute @workgroup_size(8,16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var acc0: array<f32,16>;
  var gidx0 = i32(gindex.x); /* 128 */
  var gidx1 = i32(gindex.y); /* 256 */
  var gidx2 = i32(gindex.z); /* 4 */
  var lidx0 = i32(lindex.x); /* 8 */
  var lidx1 = i32(lindex.y); /* 16 */
  var cast0 = bitcast<i32>((bitcast<u32>(gidx1)<<16u));
  var cast1 = bitcast<u32>((gidx0&3));
  var alu0 = (lidx1+bitcast<i32>((cast1<<4u)));
  var alu1 = (bitcast<i32>((bitcast<u32>(lidx0)<<8u))+bitcast<i32>((bitcast<u32>((gidx0>>2u))<<11u))+bitcast<i32>((bitcast<u32>(lidx1)<<2u))+bitcast<i32>((cast1<<6u)));
  var alu2 = (gidx0<120);
  var alu3 = (alu0<60);
  var alu4 = (3<alu0);
  var alu5 = (7<gidx0);
  acc0[0] = 0.0f;
  acc0[1] = 0.0f;
  acc0[2] = 0.0f;
  acc0[3] = 0.0f;
  acc0[4] = 0.0f;
  acc0[5] = 0.0f;
  acc0[6] = 0.0f;
  acc0[7] = 0.0f;
  acc0[8] = 0.0f;
  acc0[9] = 0.0f;
  acc0[10] = 0.0f;
  acc0[11] = 0.0f;
  acc0[12] = 0.0f;
  acc0[13] = 0.0f;
  acc0[14] = 0.0f;
  acc0[15] = 0.0f;
  for (var Ridx0 = 0; Ridx0 < 3; Ridx0++) {
    var cast2 = bitcast<u32>(Ridx0);
    var alu22 = (gidx1+bitcast<i32>((cast2<<4u)));
    var alu23 = (alu1+cast0+bitcast<i32>((cast2<<20u)));
    var alu24 = ((15<alu22)&(alu22<272));
    var alu25 = (alu4&alu5&alu24);
    var val0 = select((f16(0.0f)), data1_16777216[(alu23+-1052688)], alu25);
    var alu26 = ((gidx2*108)+(Ridx0*9));
    var val1 = data2_432[(alu26+1)];
    var val2 = data2_432[(alu26+2)];
    var val3 = data2_432[alu26];
    var val4 = select((f16(0.0f)), data1_16777216[(alu23+-1052686)], alu25);
    var val5 = select((f16(0.0f)), data1_16777216[(alu23+-1052685)], alu25);
    var alu27 = (alu5&alu24);
    var val6 = select((f16(0.0f)), data1_16777216[(alu23+-1052672)], alu27);
    var val7 = select((f16(0.0f)), data1_16777216[(alu23+-1052670)], alu27);
    var val8 = select((f16(0.0f)), data1_16777216[(alu23+-1052669)], alu27);
    var alu28 = (alu3&alu5&alu24);
    var val9 = select((f16(0.0f)), data1_16777216[(alu23+-1052656)], alu28);
    var val10 = select((f16(0.0f)), data1_16777216[(alu23+-1052654)], alu28);
    var val11 = select((f16(0.0f)), data1_16777216[(alu23+-1052653)], alu28);
    var alu29 = (alu4&alu24);
    var val12 = select((f16(0.0f)), data1_16777216[(alu23+-1048592)], alu29);
    var val13 = data2_432[(alu26+3)];
    var val14 = select((f16(0.0f)), data1_16777216[(alu23+-1048590)], alu29);
    var val15 = select((f16(0.0f)), data1_16777216[(alu23+-1048589)], alu29);
    var val16 = select((f16(0.0f)), data1_16777216[(alu23+-1048576)], alu24);
    var val17 = data2_432[(alu26+4)];
    var val18 = select((f16(0.0f)), data1_16777216[(alu23+-1048574)], alu24);
    var val19 = select((f16(0.0f)), data1_16777216[(alu23+-1048573)], alu24);
    var alu30 = (alu3&alu24);
    var val20 = select((f16(0.0f)), data1_16777216[(alu23+-1048560)], alu30);
    var val21 = data2_432[(alu26+5)];
    var val22 = select((f16(0.0f)), data1_16777216[(alu23+-1048558)], alu30);
    var val23 = select((f16(0.0f)), data1_16777216[(alu23+-1048557)], alu30);
    var alu31 = (alu4&alu2&alu24);
    var val24 = select((f16(0.0f)), data1_16777216[(alu23+-1044496)], alu31);
    var val25 = data2_432[(alu26+6)];
    var val26 = select((f16(0.0f)), data1_16777216[(alu23+-1044494)], alu31);
    var val27 = select((f16(0.0f)), data1_16777216[(alu23+-1044493)], alu31);
    var alu32 = (alu2&alu24);
    var val28 = select((f16(0.0f)), data1_16777216[(alu23+-1044480)], alu32);
    var val29 = data2_432[(alu26+7)];
    var val30 = select((f16(0.0f)), data1_16777216[(alu23+-1044478)], alu32);
    var val31 = select((f16(0.0f)), data1_16777216[(alu23+-1044477)], alu32);
    var alu33 = (alu3&alu2&alu24);
    var val32 = select((f16(0.0f)), data1_16777216[(alu23+-1044464)], alu33);
    var val33 = data2_432[(alu26+8)];
    var val34 = data2_432[(alu26+27)];
    var val35 = data2_432[(alu26+28)];
    var val36 = data2_432[(alu26+29)];
    var val37 = data2_432[(alu26+30)];
    var val38 = data2_432[(alu26+31)];
    var val39 = data2_432[(alu26+32)];
    var val40 = data2_432[(alu26+33)];
    var val41 = data2_432[(alu26+34)];
    var val42 = data2_432[(alu26+35)];
    var val43 = data2_432[(alu26+54)];
    var val44 = data2_432[(alu26+55)];
    var val45 = data2_432[(alu26+56)];
    var val46 = data2_432[(alu26+57)];
    var val47 = data2_432[(alu26+58)];
    var val48 = data2_432[(alu26+59)];
    var val49 = data2_432[(alu26+60)];
    var val50 = data2_432[(alu26+61)];
    var val51 = data2_432[(alu26+62)];
    var val52 = data2_432[(alu26+81)];
    var val53 = data2_432[(alu26+82)];
    var val54 = data2_432[(alu26+83)];
    var val55 = data2_432[(alu26+84)];
    var val56 = data2_432[(alu26+85)];
    var val57 = data2_432[(alu26+86)];
    var val58 = data2_432[(alu26+87)];
    var val59 = data2_432[(alu26+88)];
    var val60 = data2_432[(alu26+89)];
    var val61 = select((f16(0.0f)), data1_16777216[(alu23+-1052687)], alu25);
    var val62 = select((f16(0.0f)), data1_16777216[(alu23+-1052671)], alu27);
    var val63 = select((f16(0.0f)), data1_16777216[(alu23+-1052655)], alu28);
    var val64 = select((f16(0.0f)), data1_16777216[(alu23+-1048591)], alu29);
    var val65 = select((f16(0.0f)), data1_16777216[(alu23+-1048575)], alu24);
    var val66 = select((f16(0.0f)), data1_16777216[(alu23+-1048559)], alu30);
    var val67 = select((f16(0.0f)), data1_16777216[(alu23+-1044495)], alu31);
    var val68 = select((f16(0.0f)), data1_16777216[(alu23+-1044479)], alu32);
    var val69 = select((f16(0.0f)), data1_16777216[(alu23+-1044463)], alu33);
    var val70 = select((f16(0.0f)), data1_16777216[(alu23+-1044462)], alu33);
    var val71 = select((f16(0.0f)), data1_16777216[(alu23+-1044461)], alu33);
    acc0[0] = (acc0[0]+(f32((val0*val3)))+(f32((val6*val1)))+(f32((val9*val2)))+(f32((val12*val13)))+(f32((val16*val17)))+(f32((val20*val21)))+(f32((val24*val25)))+(f32((val28*val29)))+(f32((val32*val33))));
    acc0[1] = (acc0[1]+(f32((val0*val34)))+(f32((val6*val35)))+(f32((val9*val36)))+(f32((val12*val37)))+(f32((val16*val38)))+(f32((val20*val39)))+(f32((val24*val40)))+(f32((val28*val41)))+(f32((val32*val42))));
    acc0[2] = (acc0[2]+(f32((val0*val43)))+(f32((val6*val44)))+(f32((val9*val45)))+(f32((val12*val46)))+(f32((val16*val47)))+(f32((val20*val48)))+(f32((val24*val49)))+(f32((val28*val50)))+(f32((val32*val51))));
    acc0[3] = (acc0[3]+(f32((val0*val52)))+(f32((val6*val53)))+(f32((val9*val54)))+(f32((val12*val55)))+(f32((val16*val56)))+(f32((val20*val57)))+(f32((val24*val58)))+(f32((val28*val59)))+(f32((val32*val60))));
    acc0[4] = (acc0[4]+(f32((val61*val3)))+(f32((val62*val1)))+(f32((val63*val2)))+(f32((val64*val13)))+(f32((val65*val17)))+(f32((val66*val21)))+(f32((val67*val25)))+(f32((val68*val29)))+(f32((val69*val33))));
    acc0[5] = (acc0[5]+(f32((val61*val34)))+(f32((val62*val35)))+(f32((val63*val36)))+(f32((val64*val37)))+(f32((val65*val38)))+(f32((val66*val39)))+(f32((val67*val40)))+(f32((val68*val41)))+(f32((val69*val42))));
    acc0[6] = (acc0[6]+(f32((val61*val43)))+(f32((val62*val44)))+(f32((val63*val45)))+(f32((val64*val46)))+(f32((val65*val47)))+(f32((val66*val48)))+(f32((val67*val49)))+(f32((val68*val50)))+(f32((val69*val51))));
    acc0[7] = (acc0[7]+(f32((val61*val52)))+(f32((val62*val53)))+(f32((val63*val54)))+(f32((val64*val55)))+(f32((val65*val56)))+(f32((val66*val57)))+(f32((val67*val58)))+(f32((val68*val59)))+(f32((val69*val60))));
    acc0[8] = (acc0[8]+(f32((val4*val3)))+(f32((val7*val1)))+(f32((val10*val2)))+(f32((val14*val13)))+(f32((val18*val17)))+(f32((val22*val21)))+(f32((val26*val25)))+(f32((val30*val29)))+(f32((val70*val33))));
    acc0[9] = (acc0[9]+(f32((val4*val34)))+(f32((val7*val35)))+(f32((val10*val36)))+(f32((val14*val37)))+(f32((val18*val38)))+(f32((val22*val39)))+(f32((val26*val40)))+(f32((val30*val41)))+(f32((val70*val42))));
    acc0[10] = (acc0[10]+(f32((val4*val43)))+(f32((val7*val44)))+(f32((val10*val45)))+(f32((val14*val46)))+(f32((val18*val47)))+(f32((val22*val48)))+(f32((val26*val49)))+(f32((val30*val50)))+(f32((val70*val51))));
    acc0[11] = (acc0[11]+(f32((val4*val52)))+(f32((val7*val53)))+(f32((val10*val54)))+(f32((val14*val55)))+(f32((val18*val56)))+(f32((val22*val57)))+(f32((val26*val58)))+(f32((val30*val59)))+(f32((val70*val60))));
    acc0[12] = (acc0[12]+(f32((val5*val3)))+(f32((val8*val1)))+(f32((val11*val2)))+(f32((val15*val13)))+(f32((val19*val17)))+(f32((val23*val21)))+(f32((val27*val25)))+(f32((val31*val29)))+(f32((val71*val33))));
    acc0[13] = (acc0[13]+(f32((val5*val34)))+(f32((val8*val35)))+(f32((val11*val36)))+(f32((val15*val37)))+(f32((val19*val38)))+(f32((val23*val39)))+(f32((val27*val40)))+(f32((val31*val41)))+(f32((val71*val42))));
    acc0[14] = (acc0[14]+(f32((val5*val43)))+(f32((val8*val44)))+(f32((val11*val45)))+(f32((val15*val46)))+(f32((val19*val47)))+(f32((val23*val48)))+(f32((val27*val49)))+(f32((val31*val50)))+(f32((val71*val51))));
    acc0[15] = (acc0[15]+(f32((val5*val52)))+(f32((val8*val53)))+(f32((val11*val54)))+(f32((val15*val55)))+(f32((val19*val56)))+(f32((val23*val57)))+(f32((val27*val58)))+(f32((val31*val59)))+(f32((val71*val60))));
  }
  var alu51 = (alu1+cast0+bitcast<i32>((bitcast<u32>(gidx2)<<26u)));
  data0_268435456[alu51] = (f16(acc0[0]));
  data0_268435456[(alu51+1)] = (f16(acc0[4]));
  data0_268435456[(alu51+2)] = (f16(acc0[8]));
  data0_268435456[(alu51+3)] = (f16(acc0[12]));
  data0_268435456[(alu51+16777216)] = (f16(acc0[1]));
  data0_268435456[(alu51+16777217)] = (f16(acc0[5]));
  data0_268435456[(alu51+16777218)] = (f16(acc0[9]));
  data0_268435456[(alu51+16777219)] = (f16(acc0[13]));
  data0_268435456[(alu51+33554432)] = (f16(acc0[2]));
  data0_268435456[(alu51+33554433)] = (f16(acc0[6]));
  data0_268435456[(alu51+33554434)] = (f16(acc0[10]));
  data0_268435456[(alu51+33554435)] = (f16(acc0[14]));
  data0_268435456[(alu51+50331648)] = (f16(acc0[3]));
  data0_268435456[(alu51+50331649)] = (f16(acc0[7]));
  data0_268435456[(alu51+50331650)] = (f16(acc0[11]));
  data0_268435456[(alu51+50331651)] = (f16(acc0[15]));
}`;

const r_8192_32_4_64_4n1 = `enable f16;
fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0_1048576:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1_268435456:array<f16>;
@compute @workgroup_size(32) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var acc0: array<f32,4>;
  var gidx0 = i32(gindex.x); /* 8192 */
  var lidx0 = i32(lindex.x); /* 32 */
  var cast0 = bitcast<u32>(gidx0);
  var cast1 = bitcast<u32>(lidx0);
  acc0[0] = 0.0f;
  acc0[1] = 0.0f;
  acc0[2] = 0.0f;
  acc0[3] = 0.0f;
  for (var Ridx0 = 0; Ridx0 < 64; Ridx0++) {
    var alu4 = (bitcast<i32>((cast0<<15u))+bitcast<i32>((cast1<<10u))+bitcast<i32>((bitcast<u32>(Ridx0)<<2u)));
    var val0 = data1_268435456[alu4];
    var val1 = data1_268435456[(alu4+1)];
    var val2 = data1_268435456[(alu4+2)];
    var val3 = data1_268435456[(alu4+3)];
    var val4 = data1_268435456[(alu4+256)];
    var val5 = data1_268435456[(alu4+257)];
    var val6 = data1_268435456[(alu4+258)];
    var val7 = data1_268435456[(alu4+259)];
    var val8 = data1_268435456[(alu4+512)];
    var val9 = data1_268435456[(alu4+513)];
    var val10 = data1_268435456[(alu4+514)];
    var val11 = data1_268435456[(alu4+515)];
    var val12 = data1_268435456[(alu4+768)];
    var val13 = data1_268435456[(alu4+769)];
    var val14 = data1_268435456[(alu4+770)];
    var val15 = data1_268435456[(alu4+771)];
    acc0[0] = (acc0[0]+(f32(val0))+(f32(val1))+(f32(val2))+(f32(val3)));
    acc0[1] = (acc0[1]+(f32(val4))+(f32(val5))+(f32(val6))+(f32(val7)));
    acc0[2] = (acc0[2]+(f32(val8))+(f32(val9))+(f32(val10))+(f32(val11)));
    acc0[3] = (acc0[3]+(f32(val12))+(f32(val13))+(f32(val14))+(f32(val15)));
  }
  var alu10 = (bitcast<i32>((cast0<<7u))+bitcast<i32>((cast1<<2u)));
  data0_1048576[alu10] = acc0[0];
  data0_1048576[(alu10+1)] = acc0[1];
  data0_1048576[(alu10+2)] = acc0[2];
  data0_1048576[(alu10+3)] = acc0[3];
}`;

const r_32_32_4_64_4n1 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0_4096:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1_1048576:array<f32>;
@compute @workgroup_size(32) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var acc0: array<f32,4>;
  var gidx0 = i32(gindex.x); /* 32 */
  var lidx0 = i32(lindex.x); /* 32 */
  var cast0 = bitcast<u32>(gidx0);
  var cast1 = bitcast<u32>(lidx0);
  acc0[0] = 0.0f;
  acc0[1] = 0.0f;
  acc0[2] = 0.0f;
  acc0[3] = 0.0f;
  for (var Ridx0 = 0; Ridx0 < 64; Ridx0++) {
    var alu4 = (bitcast<i32>((cast0<<15u))+bitcast<i32>((cast1<<10u))+bitcast<i32>((bitcast<u32>(Ridx0)<<2u)));
    var val0 = data1_1048576[alu4];
    var val1 = data1_1048576[(alu4+1)];
    var val2 = data1_1048576[(alu4+2)];
    var val3 = data1_1048576[(alu4+3)];
    var val4 = data1_1048576[(alu4+256)];
    var val5 = data1_1048576[(alu4+257)];
    var val6 = data1_1048576[(alu4+258)];
    var val7 = data1_1048576[(alu4+259)];
    var val8 = data1_1048576[(alu4+512)];
    var val9 = data1_1048576[(alu4+513)];
    var val10 = data1_1048576[(alu4+514)];
    var val11 = data1_1048576[(alu4+515)];
    var val12 = data1_1048576[(alu4+768)];
    var val13 = data1_1048576[(alu4+769)];
    var val14 = data1_1048576[(alu4+770)];
    var val15 = data1_1048576[(alu4+771)];
    acc0[0] = (acc0[0]+val0+val1+val2+val3);
    acc0[1] = (acc0[1]+val4+val5+val6+val7);
    acc0[2] = (acc0[2]+val8+val9+val10+val11);
    acc0[3] = (acc0[3]+val12+val13+val14+val15);
  }
  var alu10 = (bitcast<i32>((cast0<<7u))+bitcast<i32>((cast1<<2u)));
  data0_4096[alu10] = acc0[0];
  data0_4096[(alu10+1)] = acc0[1];
  data0_4096[(alu10+2)] = acc0[2];
  data0_4096[(alu10+3)] = acc0[3];
}`;

const r_16_16_16n2 = `enable f16;
fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
var<workgroup> temp0: array<f32,16>;
@group(0) @binding(1)var<storage,read_write>data0_16:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1_4096:array<f32>;
@compute @workgroup_size(16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var acc0: array<f32,1>;
  var acc1: array<f32,1>;
  var gidx0 = i32(gindex.x); /* 16 */
  var lidx0 = i32(lindex.x); /* 16 */
  acc0[0] = 0.0f;
  for (var Ridx0 = 0; Ridx0 < 16; Ridx0++) {
    var val0 = data1_4096[(bitcast<i32>((bitcast<u32>(lidx0)<<4u))+Ridx0+bitcast<i32>((bitcast<u32>(gidx0)<<8u)))];
    acc0[0] = (acc0[0]+val0);
  }
  temp0[lidx0] = acc0[0];
  workgroupBarrier();
  acc1[0] = 0.0f;
  for (var Ridx102 = 0; Ridx102 < 16; Ridx102++) {
    var val1 = temp0[Ridx102];
    acc1[0] = (acc1[0]+val1);
  }
  var alu8 = ((bool(lidx0))!=true);
  if (alu8) {
    data0_16[gidx0] = (f32((f16((acc1[0]*5.960464477539063e-08f)))));
  }
}`;

const r_2_1024_8_16_4_64_4n1 = `enable f16;
fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0_1048576:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1_268435456:array<f16>;
@group(0) @binding(3)var<storage,read_write>data2_16:array<f32>;
@compute @workgroup_size(8,16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var acc0: array<f32,4>;
  var gidx1 = i32(gindex.y); /* 2 */
  var lidx0 = i32(lindex.x); /* 8 */
  var cast0 = bitcast<u32>(gidx1);
  var val0 = data2_16[(lidx0+bitcast<i32>((cast0<<3u)))];
  var gidx0 = i32(gindex.x); /* 1024 */
  var lidx1 = i32(lindex.y); /* 16 */
  var cast1 = (f16(val0));
  var cast2 = bitcast<u32>(gidx0);
  var cast3 = bitcast<u32>(lidx0);
  var cast4 = bitcast<u32>(lidx1);
  acc0[0] = 0.0f;
  acc0[1] = 0.0f;
  acc0[2] = 0.0f;
  acc0[3] = 0.0f;
  for (var Ridx0 = 0; Ridx0 < 64; Ridx0++) {
    var alu4 = (bitcast<i32>((cast2<<14u))+bitcast<i32>((cast4<<10u))+bitcast<i32>((bitcast<u32>(Ridx0)<<2u))+bitcast<i32>((cast0<<27u))+bitcast<i32>((cast3<<24u)));
    var val1 = data1_268435456[alu4];
    var val2 = data1_268435456[(alu4+1)];
    var val3 = data1_268435456[(alu4+2)];
    var val4 = data1_268435456[(alu4+3)];
    var val5 = data1_268435456[(alu4+256)];
    var val6 = data1_268435456[(alu4+257)];
    var val7 = data1_268435456[(alu4+258)];
    var val8 = data1_268435456[(alu4+259)];
    var val9 = data1_268435456[(alu4+512)];
    var val10 = data1_268435456[(alu4+513)];
    var val11 = data1_268435456[(alu4+514)];
    var val12 = data1_268435456[(alu4+515)];
    var val13 = data1_268435456[(alu4+768)];
    var val14 = data1_268435456[(alu4+769)];
    var val15 = data1_268435456[(alu4+770)];
    var val16 = data1_268435456[(alu4+771)];
    var alu5 = (val1-cast1);
    var alu6 = (val2-cast1);
    var alu7 = (val3-cast1);
    var alu8 = (val4-cast1);
    var alu9 = (val5-cast1);
    var alu10 = (val6-cast1);
    var alu11 = (val7-cast1);
    var alu12 = (val8-cast1);
    var alu13 = (val9-cast1);
    var alu14 = (val10-cast1);
    var alu15 = (val11-cast1);
    var alu16 = (val12-cast1);
    var alu17 = (val13-cast1);
    var alu18 = (val14-cast1);
    var alu19 = (val15-cast1);
    var alu20 = (val16-cast1);
    acc0[0] = (acc0[0]+(f32((alu5*alu5)))+(f32((alu6*alu6)))+(f32((alu7*alu7)))+(f32((alu8*alu8))));
    acc0[1] = (acc0[1]+(f32((alu9*alu9)))+(f32((alu10*alu10)))+(f32((alu11*alu11)))+(f32((alu12*alu12))));
    acc0[2] = (acc0[2]+(f32((alu13*alu13)))+(f32((alu14*alu14)))+(f32((alu15*alu15)))+(f32((alu16*alu16))));
    acc0[3] = (acc0[3]+(f32((alu17*alu17)))+(f32((alu18*alu18)))+(f32((alu19*alu19)))+(f32((alu20*alu20))));
  }
  var alu26 = (bitcast<i32>((cast2<<6u))+bitcast<i32>((cast4<<2u))+bitcast<i32>((cast0<<19u))+bitcast<i32>((cast3<<16u)));
  data0_1048576[alu26] = acc0[0];
  data0_1048576[(alu26+1)] = acc0[1];
  data0_1048576[(alu26+2)] = acc0[2];
  data0_1048576[(alu26+3)] = acc0[3];
}`;

const r_16_16_16n3 = `enable f16;
fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
var<workgroup> temp0: array<f32,16>;
@group(0) @binding(1)var<storage,read_write>data0_16:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1_4096:array<f32>;
@compute @workgroup_size(16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var acc0: array<f32,1>;
  var acc1: array<f32,1>;
  var gidx0 = i32(gindex.x); /* 16 */
  var lidx0 = i32(lindex.x); /* 16 */
  acc0[0] = 0.0f;
  for (var Ridx0 = 0; Ridx0 < 16; Ridx0++) {
    var val0 = data1_4096[(bitcast<i32>((bitcast<u32>(lidx0)<<4u))+Ridx0+bitcast<i32>((bitcast<u32>(gidx0)<<8u)))];
    acc0[0] = (acc0[0]+val0);
  }
  temp0[lidx0] = acc0[0];
  workgroupBarrier();
  acc1[0] = 0.0f;
  for (var Ridx102 = 0; Ridx102 < 16; Ridx102++) {
    var val1 = temp0[Ridx102];
    acc1[0] = (acc1[0]+val1);
  }
  var alu8 = ((bool(lidx0))!=true);
  if (alu8) {
    data0_16[gidx0] = (f32((1/sqrt(((f16((acc1[0]*5.960464477539063e-08f)))+(f16(1e-05f)))))));
  }
}`;

const r_4_256_32_4_8_16_4_4_16_3_3_3n5 = `enable f16;
fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0_268435456:array<f16>;
@group(0) @binding(2)var<storage,read_write>data1_268435456:array<f16>;
@group(0) @binding(3)var<storage,read_write>data2_16:array<f32>;
@group(0) @binding(4)var<storage,read_write>data3_16:array<f32>;
@group(0) @binding(5)var<storage,read_write>data4_6912:array<f16>;
@compute @workgroup_size(8,16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var acc0: array<f32,16>;
  var gidx0 = i32(gindex.x); /* 128 */
  var gidx1 = i32(gindex.y); /* 256 */
  var gidx2 = i32(gindex.z); /* 4 */
  var lidx0 = i32(lindex.x); /* 8 */
  var lidx1 = i32(lindex.y); /* 16 */
  var cast0 = bitcast<i32>((bitcast<u32>(gidx1)<<16u));
  var cast1 = bitcast<u32>((gidx0&3));
  var alu0 = (lidx1+bitcast<i32>((cast1<<4u)));
  var alu1 = (bitcast<i32>((bitcast<u32>(lidx0)<<8u))+bitcast<i32>((bitcast<u32>((gidx0>>2u))<<11u))+bitcast<i32>((bitcast<u32>(lidx1)<<2u))+bitcast<i32>((cast1<<6u)));
  var alu2 = (gidx0<124);
  var alu3 = (alu0<62);
  var alu4 = (1<alu0);
  var alu5 = (3<gidx0);
  acc0[0] = 0.0f;
  acc0[1] = 0.0f;
  acc0[2] = 0.0f;
  acc0[3] = 0.0f;
  acc0[4] = 0.0f;
  acc0[5] = 0.0f;
  acc0[6] = 0.0f;
  acc0[7] = 0.0f;
  acc0[8] = 0.0f;
  acc0[9] = 0.0f;
  acc0[10] = 0.0f;
  acc0[11] = 0.0f;
  acc0[12] = 0.0f;
  acc0[13] = 0.0f;
  acc0[14] = 0.0f;
  acc0[15] = 0.0f;
  for (var Ridx0 = 0; Ridx0 < 16; Ridx0++) {
    var val0 = data2_16[Ridx0];
    var val1 = data3_16[Ridx0];
    var cast2 = (f16(val0));
    var cast3 = (f16(val1));
    for (var Ridx1 = 0; Ridx1 < 3; Ridx1++) {
      var cast4 = bitcast<u32>(Ridx1);
      var alu22 = (gidx1+bitcast<i32>((cast4<<3u)));
      var alu23 = (alu1+cast0+bitcast<i32>((cast4<<19u))+bitcast<i32>((bitcast<u32>(Ridx0)<<24u)));
      var alu24 = ((7<alu22)&(alu22<264));
      var alu25 = (alu4&alu5&alu24);
      var val2 = select((f16(0.0f)), data1_268435456[(alu23+-526344)], alu25);
      var alu26 = ((Ridx0*27)+(Ridx1*9)+(gidx2*1728));
      var val3 = data4_6912[alu26];
      var alu27 = (alu5&alu24);
      var val4 = select((f16(0.0f)), data1_268435456[(alu23+-526336)], alu27);
      var val5 = data4_6912[(alu26+1)];
      var alu28 = (alu3&alu5&alu24);
      var val6 = select((f16(0.0f)), data1_268435456[(alu23+-526328)], alu28);
      var val7 = data4_6912[(alu26+2)];
      var alu29 = (alu4&alu24);
      var val8 = select((f16(0.0f)), data1_268435456[(alu23+-524296)], alu29);
      var val9 = data4_6912[(alu26+3)];
      var val10 = select((f16(0.0f)), data1_268435456[(alu23+-524288)], alu24);
      var val11 = data4_6912[(alu26+4)];
      var alu30 = (alu3&alu24);
      var val12 = select((f16(0.0f)), data1_268435456[(alu23+-524280)], alu30);
      var val13 = data4_6912[(alu26+5)];
      var alu31 = (alu4&alu2&alu24);
      var val14 = select((f16(0.0f)), data1_268435456[(alu23+-522248)], alu31);
      var val15 = data4_6912[(alu26+6)];
      var alu32 = (alu2&alu24);
      var val16 = select((f16(0.0f)), data1_268435456[(alu23+-522240)], alu32);
      var val17 = data4_6912[(alu26+7)];
      var alu33 = (alu3&alu2&alu24);
      var val18 = select((f16(0.0f)), data1_268435456[(alu23+-522232)], alu33);
      var val19 = data4_6912[(alu26+8)];
      var val20 = data4_6912[(alu26+432)];
      var val21 = data4_6912[(alu26+433)];
      var val22 = data4_6912[(alu26+434)];
      var val23 = data4_6912[(alu26+435)];
      var val24 = data4_6912[(alu26+436)];
      var val25 = data4_6912[(alu26+437)];
      var val26 = data4_6912[(alu26+438)];
      var val27 = data4_6912[(alu26+439)];
      var val28 = data4_6912[(alu26+440)];
      var val29 = data4_6912[(alu26+864)];
      var val30 = data4_6912[(alu26+865)];
      var val31 = data4_6912[(alu26+866)];
      var val32 = data4_6912[(alu26+867)];
      var val33 = data4_6912[(alu26+868)];
      var val34 = data4_6912[(alu26+869)];
      var val35 = data4_6912[(alu26+870)];
      var val36 = data4_6912[(alu26+871)];
      var val37 = data4_6912[(alu26+872)];
      var val38 = data4_6912[(alu26+1296)];
      var val39 = data4_6912[(alu26+1297)];
      var val40 = data4_6912[(alu26+1298)];
      var val41 = data4_6912[(alu26+1299)];
      var val42 = data4_6912[(alu26+1300)];
      var val43 = data4_6912[(alu26+1301)];
      var val44 = data4_6912[(alu26+1302)];
      var val45 = data4_6912[(alu26+1303)];
      var val46 = data4_6912[(alu26+1304)];
      var val47 = select((f16(0.0f)), data1_268435456[(alu23+-526343)], alu25);
      var val48 = select((f16(0.0f)), data1_268435456[(alu23+-526342)], alu25);
      var val49 = select((f16(0.0f)), data1_268435456[(alu23+-526341)], alu25);
      var val50 = select((f16(0.0f)), data1_268435456[(alu23+-526335)], alu27);
      var val51 = select((f16(0.0f)), data1_268435456[(alu23+-526334)], alu27);
      var val52 = select((f16(0.0f)), data1_268435456[(alu23+-526333)], alu27);
      var val53 = select((f16(0.0f)), data1_268435456[(alu23+-526327)], alu28);
      var val54 = select((f16(0.0f)), data1_268435456[(alu23+-526326)], alu28);
      var val55 = select((f16(0.0f)), data1_268435456[(alu23+-526325)], alu28);
      var val56 = select((f16(0.0f)), data1_268435456[(alu23+-524295)], alu29);
      var val57 = select((f16(0.0f)), data1_268435456[(alu23+-524294)], alu29);
      var val58 = select((f16(0.0f)), data1_268435456[(alu23+-524293)], alu29);
      var val59 = select((f16(0.0f)), data1_268435456[(alu23+-524287)], alu24);
      var val60 = select((f16(0.0f)), data1_268435456[(alu23+-524286)], alu24);
      var val61 = select((f16(0.0f)), data1_268435456[(alu23+-524285)], alu24);
      var val62 = select((f16(0.0f)), data1_268435456[(alu23+-524279)], alu30);
      var val63 = select((f16(0.0f)), data1_268435456[(alu23+-524278)], alu30);
      var val64 = select((f16(0.0f)), data1_268435456[(alu23+-524277)], alu30);
      var val65 = select((f16(0.0f)), data1_268435456[(alu23+-522247)], alu31);
      var val66 = select((f16(0.0f)), data1_268435456[(alu23+-522246)], alu31);
      var val67 = select((f16(0.0f)), data1_268435456[(alu23+-522245)], alu31);
      var val68 = select((f16(0.0f)), data1_268435456[(alu23+-522239)], alu32);
      var val69 = select((f16(0.0f)), data1_268435456[(alu23+-522238)], alu32);
      var val70 = select((f16(0.0f)), data1_268435456[(alu23+-522237)], alu32);
      var val71 = select((f16(0.0f)), data1_268435456[(alu23+-522231)], alu33);
      var val72 = select((f16(0.0f)), data1_268435456[(alu23+-522230)], alu33);
      var val73 = select((f16(0.0f)), data1_268435456[(alu23+-522229)], alu33);
      var alu34 = ((val10-cast2)*cast3);
      var alu35 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu34+((f16(0.044715f))*alu34*alu34*alu34))*(f16(-2.302208198144325f))))))*alu34),alu24);
      var alu36 = ((val59-cast2)*cast3);
      var alu37 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu36+((f16(0.044715f))*alu36*alu36*alu36))*(f16(-2.302208198144325f))))))*alu36),alu24);
      var alu38 = ((val60-cast2)*cast3);
      var alu39 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu38+((f16(0.044715f))*alu38*alu38*alu38))*(f16(-2.302208198144325f))))))*alu38),alu24);
      var alu40 = ((val61-cast2)*cast3);
      var alu41 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu40+((f16(0.044715f))*alu40*alu40*alu40))*(f16(-2.302208198144325f))))))*alu40),alu24);
      var alu42 = ((val16-cast2)*cast3);
      var alu43 = (alu24&alu2);
      var alu44 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu42+((f16(0.044715f))*alu42*alu42*alu42))*(f16(-2.302208198144325f))))))*alu42),alu43);
      var alu45 = ((val68-cast2)*cast3);
      var alu46 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu45+((f16(0.044715f))*alu45*alu45*alu45))*(f16(-2.302208198144325f))))))*alu45),alu43);
      var alu47 = ((val69-cast2)*cast3);
      var alu48 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu47+((f16(0.044715f))*alu47*alu47*alu47))*(f16(-2.302208198144325f))))))*alu47),alu43);
      var alu49 = ((val70-cast2)*cast3);
      var alu50 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu49+((f16(0.044715f))*alu49*alu49*alu49))*(f16(-2.302208198144325f))))))*alu49),alu43);
      var alu51 = ((val12-cast2)*cast3);
      var alu52 = (alu24&alu3);
      var alu53 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu51+((f16(0.044715f))*alu51*alu51*alu51))*(f16(-2.302208198144325f))))))*alu51),alu52);
      var alu54 = ((val62-cast2)*cast3);
      var alu55 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu54+((f16(0.044715f))*alu54*alu54*alu54))*(f16(-2.302208198144325f))))))*alu54),alu52);
      var alu56 = ((val63-cast2)*cast3);
      var alu57 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu56+((f16(0.044715f))*alu56*alu56*alu56))*(f16(-2.302208198144325f))))))*alu56),alu52);
      var alu58 = ((val64-cast2)*cast3);
      var alu59 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu58+((f16(0.044715f))*alu58*alu58*alu58))*(f16(-2.302208198144325f))))))*alu58),alu52);
      var alu60 = ((val8-cast2)*cast3);
      var alu61 = (alu24&alu4);
      var alu62 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu60+((f16(0.044715f))*alu60*alu60*alu60))*(f16(-2.302208198144325f))))))*alu60),alu61);
      var alu63 = ((val56-cast2)*cast3);
      var alu64 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu63+((f16(0.044715f))*alu63*alu63*alu63))*(f16(-2.302208198144325f))))))*alu63),alu61);
      var alu65 = ((val57-cast2)*cast3);
      var alu66 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu65+((f16(0.044715f))*alu65*alu65*alu65))*(f16(-2.302208198144325f))))))*alu65),alu61);
      var alu67 = ((val58-cast2)*cast3);
      var alu68 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu67+((f16(0.044715f))*alu67*alu67*alu67))*(f16(-2.302208198144325f))))))*alu67),alu61);
      var alu69 = ((val4-cast2)*cast3);
      var alu70 = (alu24&alu5);
      var alu71 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu69+((f16(0.044715f))*alu69*alu69*alu69))*(f16(-2.302208198144325f))))))*alu69),alu70);
      var alu72 = ((val50-cast2)*cast3);
      var alu73 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu72+((f16(0.044715f))*alu72*alu72*alu72))*(f16(-2.302208198144325f))))))*alu72),alu70);
      var alu74 = ((val51-cast2)*cast3);
      var alu75 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu74+((f16(0.044715f))*alu74*alu74*alu74))*(f16(-2.302208198144325f))))))*alu74),alu70);
      var alu76 = ((val52-cast2)*cast3);
      var alu77 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu76+((f16(0.044715f))*alu76*alu76*alu76))*(f16(-2.302208198144325f))))))*alu76),alu70);
      var alu78 = ((val18-cast2)*cast3);
      var alu79 = (alu43&alu3);
      var alu80 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu78+((f16(0.044715f))*alu78*alu78*alu78))*(f16(-2.302208198144325f))))))*alu78),alu79);
      var alu81 = ((val71-cast2)*cast3);
      var alu82 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu81+((f16(0.044715f))*alu81*alu81*alu81))*(f16(-2.302208198144325f))))))*alu81),alu79);
      var alu83 = ((val72-cast2)*cast3);
      var alu84 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu83+((f16(0.044715f))*alu83*alu83*alu83))*(f16(-2.302208198144325f))))))*alu83),alu79);
      var alu85 = ((val73-cast2)*cast3);
      var alu86 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu85+((f16(0.044715f))*alu85*alu85*alu85))*(f16(-2.302208198144325f))))))*alu85),alu79);
      var alu87 = ((val14-cast2)*cast3);
      var alu88 = (alu43&alu4);
      var alu89 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu87+((f16(0.044715f))*alu87*alu87*alu87))*(f16(-2.302208198144325f))))))*alu87),alu88);
      var alu90 = ((val65-cast2)*cast3);
      var alu91 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu90+((f16(0.044715f))*alu90*alu90*alu90))*(f16(-2.302208198144325f))))))*alu90),alu88);
      var alu92 = ((val66-cast2)*cast3);
      var alu93 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu92+((f16(0.044715f))*alu92*alu92*alu92))*(f16(-2.302208198144325f))))))*alu92),alu88);
      var alu94 = ((val67-cast2)*cast3);
      var alu95 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu94+((f16(0.044715f))*alu94*alu94*alu94))*(f16(-2.302208198144325f))))))*alu94),alu88);
      var alu96 = ((val6-cast2)*cast3);
      var alu97 = (alu70&alu3);
      var alu98 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu96+((f16(0.044715f))*alu96*alu96*alu96))*(f16(-2.302208198144325f))))))*alu96),alu97);
      var alu99 = ((val53-cast2)*cast3);
      var alu100 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu99+((f16(0.044715f))*alu99*alu99*alu99))*(f16(-2.302208198144325f))))))*alu99),alu97);
      var alu101 = ((val54-cast2)*cast3);
      var alu102 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu101+((f16(0.044715f))*alu101*alu101*alu101))*(f16(-2.302208198144325f))))))*alu101),alu97);
      var alu103 = ((val55-cast2)*cast3);
      var alu104 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu103+((f16(0.044715f))*alu103*alu103*alu103))*(f16(-2.302208198144325f))))))*alu103),alu97);
      var alu105 = ((val2-cast2)*cast3);
      var alu106 = (alu70&alu4);
      var alu107 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu105+((f16(0.044715f))*alu105*alu105*alu105))*(f16(-2.302208198144325f))))))*alu105),alu106);
      var alu108 = ((val47-cast2)*cast3);
      var alu109 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu108+((f16(0.044715f))*alu108*alu108*alu108))*(f16(-2.302208198144325f))))))*alu108),alu106);
      var alu110 = ((val48-cast2)*cast3);
      var alu111 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu110+((f16(0.044715f))*alu110*alu110*alu110))*(f16(-2.302208198144325f))))))*alu110),alu106);
      var alu112 = ((val49-cast2)*cast3);
      var alu113 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu112+((f16(0.044715f))*alu112*alu112*alu112))*(f16(-2.302208198144325f))))))*alu112),alu106);
      acc0[0] = (acc0[0]+(f32((alu107*val3)))+(f32((alu71*val5)))+(f32((alu98*val7)))+(f32((alu62*val9)))+(f32((alu35*val11)))+(f32((alu53*val13)))+(f32((alu89*val15)))+(f32((alu44*val17)))+(f32((alu80*val19))));
      acc0[1] = (acc0[1]+(f32((alu107*val20)))+(f32((alu71*val21)))+(f32((alu98*val22)))+(f32((alu62*val23)))+(f32((alu35*val24)))+(f32((alu53*val25)))+(f32((alu89*val26)))+(f32((alu44*val27)))+(f32((alu80*val28))));
      acc0[2] = (acc0[2]+(f32((alu107*val29)))+(f32((alu71*val30)))+(f32((alu98*val31)))+(f32((alu62*val32)))+(f32((alu35*val33)))+(f32((alu53*val34)))+(f32((alu89*val35)))+(f32((alu44*val36)))+(f32((alu80*val37))));
      acc0[3] = (acc0[3]+(f32((alu107*val38)))+(f32((alu71*val39)))+(f32((alu98*val40)))+(f32((alu62*val41)))+(f32((alu35*val42)))+(f32((alu53*val43)))+(f32((alu89*val44)))+(f32((alu44*val45)))+(f32((alu80*val46))));
      acc0[4] = (acc0[4]+(f32((alu109*val3)))+(f32((alu73*val5)))+(f32((alu100*val7)))+(f32((alu64*val9)))+(f32((alu37*val11)))+(f32((alu55*val13)))+(f32((alu91*val15)))+(f32((alu46*val17)))+(f32((alu82*val19))));
      acc0[5] = (acc0[5]+(f32((alu109*val20)))+(f32((alu73*val21)))+(f32((alu100*val22)))+(f32((alu64*val23)))+(f32((alu37*val24)))+(f32((alu55*val25)))+(f32((alu91*val26)))+(f32((alu46*val27)))+(f32((alu82*val28))));
      acc0[6] = (acc0[6]+(f32((alu109*val29)))+(f32((alu73*val30)))+(f32((alu100*val31)))+(f32((alu64*val32)))+(f32((alu37*val33)))+(f32((alu55*val34)))+(f32((alu91*val35)))+(f32((alu46*val36)))+(f32((alu82*val37))));
      acc0[7] = (acc0[7]+(f32((alu109*val38)))+(f32((alu73*val39)))+(f32((alu100*val40)))+(f32((alu64*val41)))+(f32((alu37*val42)))+(f32((alu55*val43)))+(f32((alu91*val44)))+(f32((alu46*val45)))+(f32((alu82*val46))));
      acc0[8] = (acc0[8]+(f32((alu111*val3)))+(f32((alu75*val5)))+(f32((alu102*val7)))+(f32((alu66*val9)))+(f32((alu39*val11)))+(f32((alu57*val13)))+(f32((alu93*val15)))+(f32((alu48*val17)))+(f32((alu84*val19))));
      acc0[9] = (acc0[9]+(f32((alu111*val20)))+(f32((alu75*val21)))+(f32((alu102*val22)))+(f32((alu66*val23)))+(f32((alu39*val24)))+(f32((alu57*val25)))+(f32((alu93*val26)))+(f32((alu48*val27)))+(f32((alu84*val28))));
      acc0[10] = (acc0[10]+(f32((alu111*val29)))+(f32((alu75*val30)))+(f32((alu102*val31)))+(f32((alu66*val32)))+(f32((alu39*val33)))+(f32((alu57*val34)))+(f32((alu93*val35)))+(f32((alu48*val36)))+(f32((alu84*val37))));
      acc0[11] = (acc0[11]+(f32((alu111*val38)))+(f32((alu75*val39)))+(f32((alu102*val40)))+(f32((alu66*val41)))+(f32((alu39*val42)))+(f32((alu57*val43)))+(f32((alu93*val44)))+(f32((alu48*val45)))+(f32((alu84*val46))));
      acc0[12] = (acc0[12]+(f32((alu113*val3)))+(f32((alu77*val5)))+(f32((alu104*val7)))+(f32((alu68*val9)))+(f32((alu41*val11)))+(f32((alu59*val13)))+(f32((alu95*val15)))+(f32((alu50*val17)))+(f32((alu86*val19))));
      acc0[13] = (acc0[13]+(f32((alu113*val20)))+(f32((alu77*val21)))+(f32((alu104*val22)))+(f32((alu68*val23)))+(f32((alu41*val24)))+(f32((alu59*val25)))+(f32((alu95*val26)))+(f32((alu50*val27)))+(f32((alu86*val28))));
      acc0[14] = (acc0[14]+(f32((alu113*val29)))+(f32((alu77*val30)))+(f32((alu104*val31)))+(f32((alu68*val32)))+(f32((alu41*val33)))+(f32((alu59*val34)))+(f32((alu95*val35)))+(f32((alu50*val36)))+(f32((alu86*val37))));
      acc0[15] = (acc0[15]+(f32((alu113*val38)))+(f32((alu77*val39)))+(f32((alu104*val40)))+(f32((alu68*val41)))+(f32((alu41*val42)))+(f32((alu59*val43)))+(f32((alu95*val44)))+(f32((alu50*val45)))+(f32((alu86*val46))));
    }
  }
  var alu132 = (alu1+cast0+bitcast<i32>((bitcast<u32>(gidx2)<<26u)));
  data0_268435456[alu132] = (f16(acc0[0]));
  data0_268435456[(alu132+1)] = (f16(acc0[4]));
  data0_268435456[(alu132+2)] = (f16(acc0[8]));
  data0_268435456[(alu132+3)] = (f16(acc0[12]));
  data0_268435456[(alu132+16777216)] = (f16(acc0[1]));
  data0_268435456[(alu132+16777217)] = (f16(acc0[5]));
  data0_268435456[(alu132+16777218)] = (f16(acc0[9]));
  data0_268435456[(alu132+16777219)] = (f16(acc0[13]));
  data0_268435456[(alu132+33554432)] = (f16(acc0[2]));
  data0_268435456[(alu132+33554433)] = (f16(acc0[6]));
  data0_268435456[(alu132+33554434)] = (f16(acc0[10]));
  data0_268435456[(alu132+33554435)] = (f16(acc0[14]));
  data0_268435456[(alu132+50331648)] = (f16(acc0[3]));
  data0_268435456[(alu132+50331649)] = (f16(acc0[7]));
  data0_268435456[(alu132+50331650)] = (f16(acc0[11]));
  data0_268435456[(alu132+50331651)] = (f16(acc0[15]));
}`;

const r_4_256_32_4_8_16_4_4_16_3_3_3n6 = `enable f16;
fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0_268435456:array<f16>;
@group(0) @binding(2)var<storage,read_write>data1_268435456:array<f16>;
@group(0) @binding(3)var<storage,read_write>data2_16:array<f32>;
@group(0) @binding(4)var<storage,read_write>data3_16:array<f32>;
@group(0) @binding(5)var<storage,read_write>data4_6912:array<f16>;
@compute @workgroup_size(8,16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var acc0: array<f32,16>;
  var gidx0 = i32(gindex.x); /* 128 */
  var gidx1 = i32(gindex.y); /* 256 */
  var gidx2 = i32(gindex.z); /* 4 */
  var lidx0 = i32(lindex.x); /* 8 */
  var lidx1 = i32(lindex.y); /* 16 */
  var cast0 = bitcast<i32>((bitcast<u32>(gidx1)<<16u));
  var cast1 = bitcast<u32>((gidx0>>2u));
  var alu0 = (gidx0&3);
  var cast2 = bitcast<u32>(alu0);
  var alu1 = (lidx0+bitcast<i32>((cast1<<3u)));
  var alu2 = (bitcast<i32>((bitcast<u32>(lidx0)<<8u))+bitcast<i32>((cast1<<11u))+bitcast<i32>((bitcast<u32>(lidx1)<<2u))+bitcast<i32>((cast2<<6u)));
  var alu3 = (alu1<252);
  var alu4 = ((lidx1+bitcast<i32>((cast2<<4u)))<63);
  var alu5 = (0<(lidx1+alu0));
  var alu6 = (3<alu1);
  acc0[0] = 0.0f;
  acc0[1] = 0.0f;
  acc0[2] = 0.0f;
  acc0[3] = 0.0f;
  acc0[4] = 0.0f;
  acc0[5] = 0.0f;
  acc0[6] = 0.0f;
  acc0[7] = 0.0f;
  acc0[8] = 0.0f;
  acc0[9] = 0.0f;
  acc0[10] = 0.0f;
  acc0[11] = 0.0f;
  acc0[12] = 0.0f;
  acc0[13] = 0.0f;
  acc0[14] = 0.0f;
  acc0[15] = 0.0f;
  for (var Ridx0 = 0; Ridx0 < 16; Ridx0++) {
    var val0 = data2_16[Ridx0];
    var val1 = data3_16[Ridx0];
    var cast3 = (f16(val0));
    var cast4 = (f16(val1));
    for (var Ridx1 = 0; Ridx1 < 3; Ridx1++) {
      var cast5 = bitcast<u32>(Ridx1);
      var alu23 = (gidx1+bitcast<i32>((cast5<<2u)));
      var alu24 = (alu2+cast0+bitcast<i32>((cast5<<18u))+bitcast<i32>((bitcast<u32>(Ridx0)<<24u)));
      var alu25 = ((3<alu23)&(alu23<260));
      var alu26 = (alu5&alu6&alu25);
      var val2 = select((f16(0.0f)), data1_268435456[(alu24+-263172)], alu26);
      var alu27 = ((Ridx0*27)+(Ridx1*9)+(gidx2*1728));
      var val3 = data4_6912[(alu27+1)];
      var val4 = data4_6912[alu27];
      var alu28 = (alu6&alu25);
      var val5 = select((f16(0.0f)), data1_268435456[(alu24+-263168)], alu28);
      var alu29 = (alu4&alu6&alu25);
      var val6 = select((f16(0.0f)), data1_268435456[(alu24+-263164)], alu29);
      var val7 = data4_6912[(alu27+2)];
      var alu30 = (alu5&alu25);
      var val8 = select((f16(0.0f)), data1_268435456[(alu24+-262148)], alu30);
      var val9 = data4_6912[(alu27+3)];
      var val10 = select((f16(0.0f)), data1_268435456[(alu24+-262144)], alu25);
      var val11 = data4_6912[(alu27+4)];
      var alu31 = (alu4&alu25);
      var val12 = select((f16(0.0f)), data1_268435456[(alu24+-262140)], alu31);
      var val13 = data4_6912[(alu27+5)];
      var alu32 = (alu5&alu3&alu25);
      var val14 = select((f16(0.0f)), data1_268435456[(alu24+-261124)], alu32);
      var val15 = data4_6912[(alu27+6)];
      var alu33 = (alu3&alu25);
      var val16 = select((f16(0.0f)), data1_268435456[(alu24+-261120)], alu33);
      var val17 = data4_6912[(alu27+7)];
      var alu34 = (alu4&alu3&alu25);
      var val18 = select((f16(0.0f)), data1_268435456[(alu24+-261116)], alu34);
      var val19 = data4_6912[(alu27+8)];
      var val20 = data4_6912[(alu27+432)];
      var val21 = data4_6912[(alu27+433)];
      var val22 = data4_6912[(alu27+434)];
      var val23 = data4_6912[(alu27+435)];
      var val24 = data4_6912[(alu27+436)];
      var val25 = data4_6912[(alu27+437)];
      var val26 = data4_6912[(alu27+438)];
      var val27 = data4_6912[(alu27+439)];
      var val28 = data4_6912[(alu27+440)];
      var val29 = data4_6912[(alu27+864)];
      var val30 = data4_6912[(alu27+865)];
      var val31 = data4_6912[(alu27+866)];
      var val32 = data4_6912[(alu27+867)];
      var val33 = data4_6912[(alu27+868)];
      var val34 = data4_6912[(alu27+869)];
      var val35 = data4_6912[(alu27+870)];
      var val36 = data4_6912[(alu27+871)];
      var val37 = data4_6912[(alu27+872)];
      var val38 = data4_6912[(alu27+1296)];
      var val39 = data4_6912[(alu27+1297)];
      var val40 = data4_6912[(alu27+1298)];
      var val41 = data4_6912[(alu27+1299)];
      var val42 = data4_6912[(alu27+1300)];
      var val43 = data4_6912[(alu27+1301)];
      var val44 = data4_6912[(alu27+1302)];
      var val45 = data4_6912[(alu27+1303)];
      var val46 = data4_6912[(alu27+1304)];
      var val47 = select((f16(0.0f)), data1_268435456[(alu24+-263171)], alu26);
      var val48 = select((f16(0.0f)), data1_268435456[(alu24+-263170)], alu26);
      var val49 = select((f16(0.0f)), data1_268435456[(alu24+-263169)], alu26);
      var val50 = select((f16(0.0f)), data1_268435456[(alu24+-263167)], alu28);
      var val51 = select((f16(0.0f)), data1_268435456[(alu24+-263166)], alu28);
      var val52 = select((f16(0.0f)), data1_268435456[(alu24+-263165)], alu28);
      var val53 = select((f16(0.0f)), data1_268435456[(alu24+-263163)], alu29);
      var val54 = select((f16(0.0f)), data1_268435456[(alu24+-263162)], alu29);
      var val55 = select((f16(0.0f)), data1_268435456[(alu24+-263161)], alu29);
      var val56 = select((f16(0.0f)), data1_268435456[(alu24+-262147)], alu30);
      var val57 = select((f16(0.0f)), data1_268435456[(alu24+-262146)], alu30);
      var val58 = select((f16(0.0f)), data1_268435456[(alu24+-262145)], alu30);
      var val59 = select((f16(0.0f)), data1_268435456[(alu24+-262143)], alu25);
      var val60 = select((f16(0.0f)), data1_268435456[(alu24+-262142)], alu25);
      var val61 = select((f16(0.0f)), data1_268435456[(alu24+-262141)], alu25);
      var val62 = select((f16(0.0f)), data1_268435456[(alu24+-262139)], alu31);
      var val63 = select((f16(0.0f)), data1_268435456[(alu24+-262138)], alu31);
      var val64 = select((f16(0.0f)), data1_268435456[(alu24+-262137)], alu31);
      var val65 = select((f16(0.0f)), data1_268435456[(alu24+-261123)], alu32);
      var val66 = select((f16(0.0f)), data1_268435456[(alu24+-261122)], alu32);
      var val67 = select((f16(0.0f)), data1_268435456[(alu24+-261121)], alu32);
      var val68 = select((f16(0.0f)), data1_268435456[(alu24+-261119)], alu33);
      var val69 = select((f16(0.0f)), data1_268435456[(alu24+-261118)], alu33);
      var val70 = select((f16(0.0f)), data1_268435456[(alu24+-261117)], alu33);
      var val71 = select((f16(0.0f)), data1_268435456[(alu24+-261115)], alu34);
      var val72 = select((f16(0.0f)), data1_268435456[(alu24+-261114)], alu34);
      var val73 = select((f16(0.0f)), data1_268435456[(alu24+-261113)], alu34);
      var alu35 = ((val10-cast3)*cast4);
      var alu36 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu35+((f16(0.044715f))*alu35*alu35*alu35))*(f16(-2.302208198144325f))))))*alu35),alu25);
      var alu37 = ((val59-cast3)*cast4);
      var alu38 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu37+((f16(0.044715f))*alu37*alu37*alu37))*(f16(-2.302208198144325f))))))*alu37),alu25);
      var alu39 = ((val60-cast3)*cast4);
      var alu40 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu39+((f16(0.044715f))*alu39*alu39*alu39))*(f16(-2.302208198144325f))))))*alu39),alu25);
      var alu41 = ((val61-cast3)*cast4);
      var alu42 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu41+((f16(0.044715f))*alu41*alu41*alu41))*(f16(-2.302208198144325f))))))*alu41),alu25);
      var alu43 = ((val16-cast3)*cast4);
      var alu44 = (alu25&alu3);
      var alu45 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu43+((f16(0.044715f))*alu43*alu43*alu43))*(f16(-2.302208198144325f))))))*alu43),alu44);
      var alu46 = ((val68-cast3)*cast4);
      var alu47 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu46+((f16(0.044715f))*alu46*alu46*alu46))*(f16(-2.302208198144325f))))))*alu46),alu44);
      var alu48 = ((val69-cast3)*cast4);
      var alu49 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu48+((f16(0.044715f))*alu48*alu48*alu48))*(f16(-2.302208198144325f))))))*alu48),alu44);
      var alu50 = ((val70-cast3)*cast4);
      var alu51 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu50+((f16(0.044715f))*alu50*alu50*alu50))*(f16(-2.302208198144325f))))))*alu50),alu44);
      var alu52 = ((val12-cast3)*cast4);
      var alu53 = (alu25&alu4);
      var alu54 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu52+((f16(0.044715f))*alu52*alu52*alu52))*(f16(-2.302208198144325f))))))*alu52),alu53);
      var alu55 = ((val62-cast3)*cast4);
      var alu56 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu55+((f16(0.044715f))*alu55*alu55*alu55))*(f16(-2.302208198144325f))))))*alu55),alu53);
      var alu57 = ((val63-cast3)*cast4);
      var alu58 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu57+((f16(0.044715f))*alu57*alu57*alu57))*(f16(-2.302208198144325f))))))*alu57),alu53);
      var alu59 = ((val64-cast3)*cast4);
      var alu60 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu59+((f16(0.044715f))*alu59*alu59*alu59))*(f16(-2.302208198144325f))))))*alu59),alu53);
      var alu61 = ((val8-cast3)*cast4);
      var alu62 = (alu25&alu5);
      var alu63 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu61+((f16(0.044715f))*alu61*alu61*alu61))*(f16(-2.302208198144325f))))))*alu61),alu62);
      var alu64 = ((val56-cast3)*cast4);
      var alu65 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu64+((f16(0.044715f))*alu64*alu64*alu64))*(f16(-2.302208198144325f))))))*alu64),alu62);
      var alu66 = ((val57-cast3)*cast4);
      var alu67 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu66+((f16(0.044715f))*alu66*alu66*alu66))*(f16(-2.302208198144325f))))))*alu66),alu62);
      var alu68 = ((val58-cast3)*cast4);
      var alu69 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu68+((f16(0.044715f))*alu68*alu68*alu68))*(f16(-2.302208198144325f))))))*alu68),alu62);
      var alu70 = ((val5-cast3)*cast4);
      var alu71 = (alu25&alu6);
      var alu72 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu70+((f16(0.044715f))*alu70*alu70*alu70))*(f16(-2.302208198144325f))))))*alu70),alu71);
      var alu73 = ((val50-cast3)*cast4);
      var alu74 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu73+((f16(0.044715f))*alu73*alu73*alu73))*(f16(-2.302208198144325f))))))*alu73),alu71);
      var alu75 = ((val51-cast3)*cast4);
      var alu76 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu75+((f16(0.044715f))*alu75*alu75*alu75))*(f16(-2.302208198144325f))))))*alu75),alu71);
      var alu77 = ((val52-cast3)*cast4);
      var alu78 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu77+((f16(0.044715f))*alu77*alu77*alu77))*(f16(-2.302208198144325f))))))*alu77),alu71);
      var alu79 = ((val18-cast3)*cast4);
      var alu80 = (alu44&alu4);
      var alu81 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu79+((f16(0.044715f))*alu79*alu79*alu79))*(f16(-2.302208198144325f))))))*alu79),alu80);
      var alu82 = ((val71-cast3)*cast4);
      var alu83 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu82+((f16(0.044715f))*alu82*alu82*alu82))*(f16(-2.302208198144325f))))))*alu82),alu80);
      var alu84 = ((val72-cast3)*cast4);
      var alu85 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu84+((f16(0.044715f))*alu84*alu84*alu84))*(f16(-2.302208198144325f))))))*alu84),alu80);
      var alu86 = ((val73-cast3)*cast4);
      var alu87 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu86+((f16(0.044715f))*alu86*alu86*alu86))*(f16(-2.302208198144325f))))))*alu86),alu80);
      var alu88 = ((val14-cast3)*cast4);
      var alu89 = (alu44&alu5);
      var alu90 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu88+((f16(0.044715f))*alu88*alu88*alu88))*(f16(-2.302208198144325f))))))*alu88),alu89);
      var alu91 = ((val65-cast3)*cast4);
      var alu92 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu91+((f16(0.044715f))*alu91*alu91*alu91))*(f16(-2.302208198144325f))))))*alu91),alu89);
      var alu93 = ((val66-cast3)*cast4);
      var alu94 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu93+((f16(0.044715f))*alu93*alu93*alu93))*(f16(-2.302208198144325f))))))*alu93),alu89);
      var alu95 = ((val67-cast3)*cast4);
      var alu96 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu95+((f16(0.044715f))*alu95*alu95*alu95))*(f16(-2.302208198144325f))))))*alu95),alu89);
      var alu97 = ((val6-cast3)*cast4);
      var alu98 = (alu71&alu4);
      var alu99 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu97+((f16(0.044715f))*alu97*alu97*alu97))*(f16(-2.302208198144325f))))))*alu97),alu98);
      var alu100 = ((val53-cast3)*cast4);
      var alu101 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu100+((f16(0.044715f))*alu100*alu100*alu100))*(f16(-2.302208198144325f))))))*alu100),alu98);
      var alu102 = ((val54-cast3)*cast4);
      var alu103 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu102+((f16(0.044715f))*alu102*alu102*alu102))*(f16(-2.302208198144325f))))))*alu102),alu98);
      var alu104 = ((val55-cast3)*cast4);
      var alu105 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu104+((f16(0.044715f))*alu104*alu104*alu104))*(f16(-2.302208198144325f))))))*alu104),alu98);
      var alu106 = ((val2-cast3)*cast4);
      var alu107 = (alu71&alu5);
      var alu108 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu106+((f16(0.044715f))*alu106*alu106*alu106))*(f16(-2.302208198144325f))))))*alu106),alu107);
      var alu109 = ((val47-cast3)*cast4);
      var alu110 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu109+((f16(0.044715f))*alu109*alu109*alu109))*(f16(-2.302208198144325f))))))*alu109),alu107);
      var alu111 = ((val48-cast3)*cast4);
      var alu112 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu111+((f16(0.044715f))*alu111*alu111*alu111))*(f16(-2.302208198144325f))))))*alu111),alu107);
      var alu113 = ((val49-cast3)*cast4);
      var alu114 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu113+((f16(0.044715f))*alu113*alu113*alu113))*(f16(-2.302208198144325f))))))*alu113),alu107);
      acc0[0] = (acc0[0]+(f32((alu108*val4)))+(f32((alu72*val3)))+(f32((alu99*val7)))+(f32((alu63*val9)))+(f32((alu36*val11)))+(f32((alu54*val13)))+(f32((alu90*val15)))+(f32((alu45*val17)))+(f32((alu81*val19))));
      acc0[1] = (acc0[1]+(f32((alu108*val20)))+(f32((alu72*val21)))+(f32((alu99*val22)))+(f32((alu63*val23)))+(f32((alu36*val24)))+(f32((alu54*val25)))+(f32((alu90*val26)))+(f32((alu45*val27)))+(f32((alu81*val28))));
      acc0[2] = (acc0[2]+(f32((alu108*val29)))+(f32((alu72*val30)))+(f32((alu99*val31)))+(f32((alu63*val32)))+(f32((alu36*val33)))+(f32((alu54*val34)))+(f32((alu90*val35)))+(f32((alu45*val36)))+(f32((alu81*val37))));
      acc0[3] = (acc0[3]+(f32((alu108*val38)))+(f32((alu72*val39)))+(f32((alu99*val40)))+(f32((alu63*val41)))+(f32((alu36*val42)))+(f32((alu54*val43)))+(f32((alu90*val44)))+(f32((alu45*val45)))+(f32((alu81*val46))));
      acc0[4] = (acc0[4]+(f32((alu110*val4)))+(f32((alu74*val3)))+(f32((alu101*val7)))+(f32((alu65*val9)))+(f32((alu38*val11)))+(f32((alu56*val13)))+(f32((alu92*val15)))+(f32((alu47*val17)))+(f32((alu83*val19))));
      acc0[5] = (acc0[5]+(f32((alu110*val20)))+(f32((alu74*val21)))+(f32((alu101*val22)))+(f32((alu65*val23)))+(f32((alu38*val24)))+(f32((alu56*val25)))+(f32((alu92*val26)))+(f32((alu47*val27)))+(f32((alu83*val28))));
      acc0[6] = (acc0[6]+(f32((alu110*val29)))+(f32((alu74*val30)))+(f32((alu101*val31)))+(f32((alu65*val32)))+(f32((alu38*val33)))+(f32((alu56*val34)))+(f32((alu92*val35)))+(f32((alu47*val36)))+(f32((alu83*val37))));
      acc0[7] = (acc0[7]+(f32((alu110*val38)))+(f32((alu74*val39)))+(f32((alu101*val40)))+(f32((alu65*val41)))+(f32((alu38*val42)))+(f32((alu56*val43)))+(f32((alu92*val44)))+(f32((alu47*val45)))+(f32((alu83*val46))));
      acc0[8] = (acc0[8]+(f32((alu112*val4)))+(f32((alu76*val3)))+(f32((alu103*val7)))+(f32((alu67*val9)))+(f32((alu40*val11)))+(f32((alu58*val13)))+(f32((alu94*val15)))+(f32((alu49*val17)))+(f32((alu85*val19))));
      acc0[9] = (acc0[9]+(f32((alu112*val20)))+(f32((alu76*val21)))+(f32((alu103*val22)))+(f32((alu67*val23)))+(f32((alu40*val24)))+(f32((alu58*val25)))+(f32((alu94*val26)))+(f32((alu49*val27)))+(f32((alu85*val28))));
      acc0[10] = (acc0[10]+(f32((alu112*val29)))+(f32((alu76*val30)))+(f32((alu103*val31)))+(f32((alu67*val32)))+(f32((alu40*val33)))+(f32((alu58*val34)))+(f32((alu94*val35)))+(f32((alu49*val36)))+(f32((alu85*val37))));
      acc0[11] = (acc0[11]+(f32((alu112*val38)))+(f32((alu76*val39)))+(f32((alu103*val40)))+(f32((alu67*val41)))+(f32((alu40*val42)))+(f32((alu58*val43)))+(f32((alu94*val44)))+(f32((alu49*val45)))+(f32((alu85*val46))));
      acc0[12] = (acc0[12]+(f32((alu114*val4)))+(f32((alu78*val3)))+(f32((alu105*val7)))+(f32((alu69*val9)))+(f32((alu42*val11)))+(f32((alu60*val13)))+(f32((alu96*val15)))+(f32((alu51*val17)))+(f32((alu87*val19))));
      acc0[13] = (acc0[13]+(f32((alu114*val20)))+(f32((alu78*val21)))+(f32((alu105*val22)))+(f32((alu69*val23)))+(f32((alu42*val24)))+(f32((alu60*val25)))+(f32((alu96*val26)))+(f32((alu51*val27)))+(f32((alu87*val28))));
      acc0[14] = (acc0[14]+(f32((alu114*val29)))+(f32((alu78*val30)))+(f32((alu105*val31)))+(f32((alu69*val32)))+(f32((alu42*val33)))+(f32((alu60*val34)))+(f32((alu96*val35)))+(f32((alu51*val36)))+(f32((alu87*val37))));
      acc0[15] = (acc0[15]+(f32((alu114*val38)))+(f32((alu78*val39)))+(f32((alu105*val40)))+(f32((alu69*val41)))+(f32((alu42*val42)))+(f32((alu60*val43)))+(f32((alu96*val44)))+(f32((alu51*val45)))+(f32((alu87*val46))));
    }
  }
  var alu133 = (alu2+cast0+bitcast<i32>((bitcast<u32>(gidx2)<<26u)));
  data0_268435456[alu133] = (f16(acc0[0]));
  data0_268435456[(alu133+1)] = (f16(acc0[4]));
  data0_268435456[(alu133+2)] = (f16(acc0[8]));
  data0_268435456[(alu133+3)] = (f16(acc0[12]));
  data0_268435456[(alu133+16777216)] = (f16(acc0[1]));
  data0_268435456[(alu133+16777217)] = (f16(acc0[5]));
  data0_268435456[(alu133+16777218)] = (f16(acc0[9]));
  data0_268435456[(alu133+16777219)] = (f16(acc0[13]));
  data0_268435456[(alu133+33554432)] = (f16(acc0[2]));
  data0_268435456[(alu133+33554433)] = (f16(acc0[6]));
  data0_268435456[(alu133+33554434)] = (f16(acc0[10]));
  data0_268435456[(alu133+33554435)] = (f16(acc0[14]));
  data0_268435456[(alu133+50331648)] = (f16(acc0[3]));
  data0_268435456[(alu133+50331649)] = (f16(acc0[7]));
  data0_268435456[(alu133+50331650)] = (f16(acc0[11]));
  data0_268435456[(alu133+50331651)] = (f16(acc0[15]));
}`;

const r_4_256_32_4_8_16_4_4_16_3_3_3n7 = `enable f16;
fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0_268435456:array<f16>;
@group(0) @binding(2)var<storage,read_write>data1_268435456:array<f16>;
@group(0) @binding(3)var<storage,read_write>data2_16:array<f32>;
@group(0) @binding(4)var<storage,read_write>data3_16:array<f32>;
@group(0) @binding(5)var<storage,read_write>data4_6912:array<f16>;
@compute @workgroup_size(8,16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var acc0: array<f32,16>;
  var gidx0 = i32(gindex.x); /* 128 */
  var gidx1 = i32(gindex.y); /* 256 */
  var gidx2 = i32(gindex.z); /* 4 */
  var lidx0 = i32(lindex.x); /* 8 */
  var lidx1 = i32(lindex.y); /* 16 */
  var cast0 = bitcast<i32>((bitcast<u32>(gidx1)<<16u));
  var cast1 = bitcast<u32>(lidx1);
  var cast2 = bitcast<u32>((gidx0>>2u));
  var cast3 = bitcast<u32>((gidx0&3));
  var alu0 = (lidx0+bitcast<i32>((cast2<<3u)));
  var alu1 = (bitcast<i32>((cast1<<2u))+bitcast<i32>((cast3<<6u)));
  var alu2 = (bitcast<i32>((bitcast<u32>(lidx0)<<8u))+bitcast<i32>((cast2<<11u))+alu1);
  var alu3 = (alu0<254);
  var alu4 = ((lidx1+bitcast<i32>((cast3<<4u)))<63);
  var alu5 = (alu1<251);
  var alu6 = (0<(bitcast<i32>((cast1<<1u))+bitcast<i32>((cast3<<5u))));
  var alu7 = (0<alu1);
  var alu8 = (1<alu0);
  acc0[0] = 0.0f;
  acc0[1] = 0.0f;
  acc0[2] = 0.0f;
  acc0[3] = 0.0f;
  acc0[4] = 0.0f;
  acc0[5] = 0.0f;
  acc0[6] = 0.0f;
  acc0[7] = 0.0f;
  acc0[8] = 0.0f;
  acc0[9] = 0.0f;
  acc0[10] = 0.0f;
  acc0[11] = 0.0f;
  acc0[12] = 0.0f;
  acc0[13] = 0.0f;
  acc0[14] = 0.0f;
  acc0[15] = 0.0f;
  for (var Ridx0 = 0; Ridx0 < 16; Ridx0++) {
    var val0 = data2_16[Ridx0];
    var val1 = data3_16[Ridx0];
    var cast4 = (f16(val0));
    var cast5 = (f16(val1));
    for (var Ridx1 = 0; Ridx1 < 3; Ridx1++) {
      var cast6 = bitcast<u32>(Ridx1);
      var alu25 = (gidx1+bitcast<i32>((cast6<<1u)));
      var alu26 = (alu2+cast0+bitcast<i32>((cast6<<17u))+bitcast<i32>((bitcast<u32>(Ridx0)<<24u)));
      var alu27 = ((1<alu25)&(alu25<258));
      var val2 = select((f16(0.0f)), data1_268435456[(alu26+-131586)], (alu6&alu8&alu27));
      var alu28 = ((Ridx0*27)+(Ridx1*9)+(gidx2*1728));
      var val3 = data4_6912[(alu28+1)];
      var val4 = data4_6912[(alu28+2)];
      var val5 = data4_6912[(alu28+4)];
      var val6 = data4_6912[(alu28+7)];
      var val7 = data4_6912[alu28];
      var alu29 = (alu8&alu27);
      var val8 = select((f16(0.0f)), data1_268435456[(alu26+-131584)], alu29);
      var val9 = select((f16(0.0f)), data1_268435456[(alu26+-131582)], alu29);
      var val10 = select((f16(0.0f)), data1_268435456[(alu26+-131580)], (alu4&alu8&alu27));
      var val11 = select((f16(0.0f)), data1_268435456[(alu26+-131579)], (alu5&alu8&alu27));
      var val12 = select((f16(0.0f)), data1_268435456[(alu26+-131074)], (alu6&alu27));
      var val13 = data4_6912[(alu28+3)];
      var val14 = select((f16(0.0f)), data1_268435456[(alu26+-131072)], alu27);
      var val15 = select((f16(0.0f)), data1_268435456[(alu26+-131070)], alu27);
      var val16 = data4_6912[(alu28+5)];
      var val17 = select((f16(0.0f)), data1_268435456[(alu26+-131069)], alu27);
      var val18 = select((f16(0.0f)), data1_268435456[(alu26+-131068)], (alu4&alu27));
      var val19 = select((f16(0.0f)), data1_268435456[(alu26+-131067)], (alu5&alu27));
      var val20 = select((f16(0.0f)), data1_268435456[(alu26+-130562)], (alu6&alu3&alu27));
      var val21 = data4_6912[(alu28+6)];
      var val22 = select((f16(0.0f)), data1_268435456[(alu26+-130561)], (alu7&alu3&alu27));
      var alu30 = (alu3&alu27);
      var val23 = select((f16(0.0f)), data1_268435456[(alu26+-130560)], alu30);
      var val24 = select((f16(0.0f)), data1_268435456[(alu26+-130559)], alu30);
      var val25 = select((f16(0.0f)), data1_268435456[(alu26+-130558)], alu30);
      var val26 = data4_6912[(alu28+8)];
      var val27 = data4_6912[(alu28+432)];
      var val28 = data4_6912[(alu28+433)];
      var val29 = data4_6912[(alu28+434)];
      var val30 = data4_6912[(alu28+435)];
      var val31 = data4_6912[(alu28+436)];
      var val32 = data4_6912[(alu28+437)];
      var val33 = data4_6912[(alu28+438)];
      var val34 = data4_6912[(alu28+439)];
      var val35 = data4_6912[(alu28+440)];
      var val36 = data4_6912[(alu28+864)];
      var val37 = data4_6912[(alu28+865)];
      var val38 = data4_6912[(alu28+866)];
      var val39 = data4_6912[(alu28+867)];
      var val40 = data4_6912[(alu28+868)];
      var val41 = data4_6912[(alu28+869)];
      var val42 = data4_6912[(alu28+870)];
      var val43 = data4_6912[(alu28+871)];
      var val44 = data4_6912[(alu28+872)];
      var val45 = data4_6912[(alu28+1296)];
      var val46 = data4_6912[(alu28+1297)];
      var val47 = data4_6912[(alu28+1298)];
      var val48 = data4_6912[(alu28+1299)];
      var val49 = data4_6912[(alu28+1300)];
      var val50 = data4_6912[(alu28+1301)];
      var val51 = data4_6912[(alu28+1302)];
      var val52 = data4_6912[(alu28+1303)];
      var val53 = data4_6912[(alu28+1304)];
      var val54 = select((f16(0.0f)), data1_268435456[(alu26+-131585)], (alu7&alu8&alu27));
      var val55 = select((f16(0.0f)), data1_268435456[(alu26+-131583)], alu29);
      var val56 = select((f16(0.0f)), data1_268435456[(alu26+-131581)], alu29);
      var val57 = select((f16(0.0f)), data1_268435456[(alu26+-131073)], (alu7&alu27));
      var val58 = select((f16(0.0f)), data1_268435456[(alu26+-131071)], alu27);
      var val59 = select((f16(0.0f)), data1_268435456[(alu26+-130557)], alu30);
      var val60 = select((f16(0.0f)), data1_268435456[(alu26+-130556)], (alu4&alu3&alu27));
      var val61 = select((f16(0.0f)), data1_268435456[(alu26+-130555)], (alu5&alu3&alu27));
      var alu31 = ((val14-cast4)*cast5);
      var alu32 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu31+((f16(0.044715f))*alu31*alu31*alu31))*(f16(-2.302208198144325f))))))*alu31),alu27);
      var alu33 = ((val58-cast4)*cast5);
      var alu34 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu33+((f16(0.044715f))*alu33*alu33*alu33))*(f16(-2.302208198144325f))))))*alu33),alu27);
      var alu35 = ((val15-cast4)*cast5);
      var alu36 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu35+((f16(0.044715f))*alu35*alu35*alu35))*(f16(-2.302208198144325f))))))*alu35),alu27);
      var alu37 = ((val17-cast4)*cast5);
      var alu38 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu37+((f16(0.044715f))*alu37*alu37*alu37))*(f16(-2.302208198144325f))))))*alu37),alu27);
      var alu39 = ((val23-cast4)*cast5);
      var alu40 = (alu27&alu3);
      var alu41 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu39+((f16(0.044715f))*alu39*alu39*alu39))*(f16(-2.302208198144325f))))))*alu39),alu40);
      var alu42 = ((val24-cast4)*cast5);
      var alu43 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu42+((f16(0.044715f))*alu42*alu42*alu42))*(f16(-2.302208198144325f))))))*alu42),alu40);
      var alu44 = ((val25-cast4)*cast5);
      var alu45 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu44+((f16(0.044715f))*alu44*alu44*alu44))*(f16(-2.302208198144325f))))))*alu44),alu40);
      var alu46 = ((val59-cast4)*cast5);
      var alu47 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu46+((f16(0.044715f))*alu46*alu46*alu46))*(f16(-2.302208198144325f))))))*alu46),alu40);
      var alu48 = ((val18-cast4)*cast5);
      var alu49 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu48+((f16(0.044715f))*alu48*alu48*alu48))*(f16(-2.302208198144325f))))))*alu48),(alu27&alu4));
      var alu50 = ((val19-cast4)*cast5);
      var alu51 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu50+((f16(0.044715f))*alu50*alu50*alu50))*(f16(-2.302208198144325f))))))*alu50),(alu27&alu5));
      var alu52 = ((val12-cast4)*cast5);
      var alu53 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu52+((f16(0.044715f))*alu52*alu52*alu52))*(f16(-2.302208198144325f))))))*alu52),(alu27&alu6));
      var alu54 = ((val57-cast4)*cast5);
      var alu55 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu54+((f16(0.044715f))*alu54*alu54*alu54))*(f16(-2.302208198144325f))))))*alu54),(alu27&alu7));
      var alu56 = ((val8-cast4)*cast5);
      var alu57 = (alu27&alu8);
      var alu58 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu56+((f16(0.044715f))*alu56*alu56*alu56))*(f16(-2.302208198144325f))))))*alu56),alu57);
      var alu59 = ((val55-cast4)*cast5);
      var alu60 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu59+((f16(0.044715f))*alu59*alu59*alu59))*(f16(-2.302208198144325f))))))*alu59),alu57);
      var alu61 = ((val9-cast4)*cast5);
      var alu62 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu61+((f16(0.044715f))*alu61*alu61*alu61))*(f16(-2.302208198144325f))))))*alu61),alu57);
      var alu63 = ((val56-cast4)*cast5);
      var alu64 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu63+((f16(0.044715f))*alu63*alu63*alu63))*(f16(-2.302208198144325f))))))*alu63),alu57);
      var alu65 = ((val60-cast4)*cast5);
      var alu66 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu65+((f16(0.044715f))*alu65*alu65*alu65))*(f16(-2.302208198144325f))))))*alu65),(alu40&alu4));
      var alu67 = ((val61-cast4)*cast5);
      var alu68 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu67+((f16(0.044715f))*alu67*alu67*alu67))*(f16(-2.302208198144325f))))))*alu67),(alu40&alu5));
      var alu69 = ((val20-cast4)*cast5);
      var alu70 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu69+((f16(0.044715f))*alu69*alu69*alu69))*(f16(-2.302208198144325f))))))*alu69),(alu40&alu6));
      var alu71 = ((val22-cast4)*cast5);
      var alu72 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu71+((f16(0.044715f))*alu71*alu71*alu71))*(f16(-2.302208198144325f))))))*alu71),(alu40&alu7));
      var alu73 = ((val10-cast4)*cast5);
      var alu74 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu73+((f16(0.044715f))*alu73*alu73*alu73))*(f16(-2.302208198144325f))))))*alu73),(alu57&alu4));
      var alu75 = ((val11-cast4)*cast5);
      var alu76 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu75+((f16(0.044715f))*alu75*alu75*alu75))*(f16(-2.302208198144325f))))))*alu75),(alu57&alu5));
      var alu77 = ((val2-cast4)*cast5);
      var alu78 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu77+((f16(0.044715f))*alu77*alu77*alu77))*(f16(-2.302208198144325f))))))*alu77),(alu57&alu6));
      var alu79 = ((val54-cast4)*cast5);
      var alu80 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu79+((f16(0.044715f))*alu79*alu79*alu79))*(f16(-2.302208198144325f))))))*alu79),(alu57&alu7));
      acc0[0] = (acc0[0]+(f32((alu78*val7)))+(f32((alu58*val3)))+(f32((alu62*val4)))+(f32((alu53*val13)))+(f32((alu32*val5)))+(f32((alu36*val16)))+(f32((alu70*val21)))+(f32((alu41*val6)))+(f32((alu45*val26))));
      acc0[1] = (acc0[1]+(f32((alu78*val27)))+(f32((alu58*val28)))+(f32((alu62*val29)))+(f32((alu53*val30)))+(f32((alu32*val31)))+(f32((alu36*val32)))+(f32((alu70*val33)))+(f32((alu41*val34)))+(f32((alu45*val35))));
      acc0[2] = (acc0[2]+(f32((alu78*val36)))+(f32((alu58*val37)))+(f32((alu62*val38)))+(f32((alu53*val39)))+(f32((alu32*val40)))+(f32((alu36*val41)))+(f32((alu70*val42)))+(f32((alu41*val43)))+(f32((alu45*val44))));
      acc0[3] = (acc0[3]+(f32((alu78*val45)))+(f32((alu58*val46)))+(f32((alu62*val47)))+(f32((alu53*val48)))+(f32((alu32*val49)))+(f32((alu36*val50)))+(f32((alu70*val51)))+(f32((alu41*val52)))+(f32((alu45*val53))));
      acc0[4] = (acc0[4]+(f32((alu80*val7)))+(f32((alu60*val3)))+(f32((alu64*val4)))+(f32((alu55*val13)))+(f32((alu34*val5)))+(f32((alu38*val16)))+(f32((alu72*val21)))+(f32((alu43*val6)))+(f32((alu47*val26))));
      acc0[5] = (acc0[5]+(f32((alu80*val27)))+(f32((alu60*val28)))+(f32((alu64*val29)))+(f32((alu55*val30)))+(f32((alu34*val31)))+(f32((alu38*val32)))+(f32((alu72*val33)))+(f32((alu43*val34)))+(f32((alu47*val35))));
      acc0[6] = (acc0[6]+(f32((alu80*val36)))+(f32((alu60*val37)))+(f32((alu64*val38)))+(f32((alu55*val39)))+(f32((alu34*val40)))+(f32((alu38*val41)))+(f32((alu72*val42)))+(f32((alu43*val43)))+(f32((alu47*val44))));
      acc0[7] = (acc0[7]+(f32((alu80*val45)))+(f32((alu60*val46)))+(f32((alu64*val47)))+(f32((alu55*val48)))+(f32((alu34*val49)))+(f32((alu38*val50)))+(f32((alu72*val51)))+(f32((alu43*val52)))+(f32((alu47*val53))));
      acc0[8] = (acc0[8]+(f32((alu58*val7)))+(f32((alu62*val3)))+(f32((alu74*val4)))+(f32((alu32*val13)))+(f32((alu36*val5)))+(f32((alu49*val16)))+(f32((alu41*val21)))+(f32((alu45*val6)))+(f32((alu66*val26))));
      acc0[9] = (acc0[9]+(f32((alu58*val27)))+(f32((alu62*val28)))+(f32((alu74*val29)))+(f32((alu32*val30)))+(f32((alu36*val31)))+(f32((alu49*val32)))+(f32((alu41*val33)))+(f32((alu45*val34)))+(f32((alu66*val35))));
      acc0[10] = (acc0[10]+(f32((alu58*val36)))+(f32((alu62*val37)))+(f32((alu74*val38)))+(f32((alu32*val39)))+(f32((alu36*val40)))+(f32((alu49*val41)))+(f32((alu41*val42)))+(f32((alu45*val43)))+(f32((alu66*val44))));
      acc0[11] = (acc0[11]+(f32((alu58*val45)))+(f32((alu62*val46)))+(f32((alu74*val47)))+(f32((alu32*val48)))+(f32((alu36*val49)))+(f32((alu49*val50)))+(f32((alu41*val51)))+(f32((alu45*val52)))+(f32((alu66*val53))));
      acc0[12] = (acc0[12]+(f32((alu60*val7)))+(f32((alu64*val3)))+(f32((alu76*val4)))+(f32((alu34*val13)))+(f32((alu38*val5)))+(f32((alu51*val16)))+(f32((alu43*val21)))+(f32((alu47*val6)))+(f32((alu68*val26))));
      acc0[13] = (acc0[13]+(f32((alu60*val27)))+(f32((alu64*val28)))+(f32((alu76*val29)))+(f32((alu34*val30)))+(f32((alu38*val31)))+(f32((alu51*val32)))+(f32((alu43*val33)))+(f32((alu47*val34)))+(f32((alu68*val35))));
      acc0[14] = (acc0[14]+(f32((alu60*val36)))+(f32((alu64*val37)))+(f32((alu76*val38)))+(f32((alu34*val39)))+(f32((alu38*val40)))+(f32((alu51*val41)))+(f32((alu43*val42)))+(f32((alu47*val43)))+(f32((alu68*val44))));
      acc0[15] = (acc0[15]+(f32((alu60*val45)))+(f32((alu64*val46)))+(f32((alu76*val47)))+(f32((alu34*val48)))+(f32((alu38*val49)))+(f32((alu51*val50)))+(f32((alu43*val51)))+(f32((alu47*val52)))+(f32((alu68*val53))));
    }
  }
  var alu99 = (alu2+cast0+bitcast<i32>((bitcast<u32>(gidx2)<<26u)));
  data0_268435456[alu99] = (f16(acc0[0]));
  data0_268435456[(alu99+1)] = (f16(acc0[4]));
  data0_268435456[(alu99+2)] = (f16(acc0[8]));
  data0_268435456[(alu99+3)] = (f16(acc0[12]));
  data0_268435456[(alu99+16777216)] = (f16(acc0[1]));
  data0_268435456[(alu99+16777217)] = (f16(acc0[5]));
  data0_268435456[(alu99+16777218)] = (f16(acc0[9]));
  data0_268435456[(alu99+16777219)] = (f16(acc0[13]));
  data0_268435456[(alu99+33554432)] = (f16(acc0[2]));
  data0_268435456[(alu99+33554433)] = (f16(acc0[6]));
  data0_268435456[(alu99+33554434)] = (f16(acc0[10]));
  data0_268435456[(alu99+33554435)] = (f16(acc0[14]));
  data0_268435456[(alu99+50331648)] = (f16(acc0[3]));
  data0_268435456[(alu99+50331649)] = (f16(acc0[7]));
  data0_268435456[(alu99+50331650)] = (f16(acc0[11]));
  data0_268435456[(alu99+50331651)] = (f16(acc0[15]));
}`;

const r_4_256_32_4_8_16_4_4_16_3_3_3n8 = `enable f16;
fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0_268435456:array<f16>;
@group(0) @binding(2)var<storage,read_write>data1_268435456:array<f16>;
@group(0) @binding(3)var<storage,read_write>data2_16:array<f32>;
@group(0) @binding(4)var<storage,read_write>data3_16:array<f32>;
@group(0) @binding(5)var<storage,read_write>data4_6912:array<f16>;
@compute @workgroup_size(8,16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var acc0: array<f32,16>;
  var gidx0 = i32(gindex.x); /* 128 */
  var gidx1 = i32(gindex.y); /* 256 */
  var gidx2 = i32(gindex.z); /* 4 */
  var lidx0 = i32(lindex.x); /* 8 */
  var lidx1 = i32(lindex.y); /* 16 */
  var cast0 = bitcast<i32>((bitcast<u32>(gidx1)<<16u));
  var alu0 = (gidx0>>2u);
  var cast1 = bitcast<u32>(alu0);
  var alu1 = (gidx0&3);
  var cast2 = bitcast<u32>(alu1);
  var alu2 = (bitcast<i32>((bitcast<u32>(lidx0)<<8u))+bitcast<i32>((cast1<<11u))+bitcast<i32>((bitcast<u32>(lidx1)<<2u))+bitcast<i32>((cast2<<6u)));
  var alu3 = ((lidx0+bitcast<i32>((cast1<<3u)))<255);
  var alu4 = ((lidx1+bitcast<i32>((cast2<<4u)))<63);
  var alu5 = (0<(lidx0+alu0));
  var alu6 = (0<(lidx1+alu1));
  acc0[0] = 0.0f;
  acc0[1] = 0.0f;
  acc0[2] = 0.0f;
  acc0[3] = 0.0f;
  acc0[4] = 0.0f;
  acc0[5] = 0.0f;
  acc0[6] = 0.0f;
  acc0[7] = 0.0f;
  acc0[8] = 0.0f;
  acc0[9] = 0.0f;
  acc0[10] = 0.0f;
  acc0[11] = 0.0f;
  acc0[12] = 0.0f;
  acc0[13] = 0.0f;
  acc0[14] = 0.0f;
  acc0[15] = 0.0f;
  for (var Ridx0 = 0; Ridx0 < 16; Ridx0++) {
    var val0 = data2_16[Ridx0];
    var val1 = data3_16[Ridx0];
    var cast3 = (f16(val0));
    var cast4 = (f16(val1));
    for (var Ridx1 = 0; Ridx1 < 3; Ridx1++) {
      var alu23 = (gidx1+Ridx1);
      var alu24 = (alu2+cast0+bitcast<i32>((bitcast<u32>(Ridx1)<<16u))+bitcast<i32>((bitcast<u32>(Ridx0)<<24u)));
      var alu25 = ((0<alu23)&(alu23<257));
      var val2 = select((f16(0.0f)), data1_268435456[(alu24+-65793)], (alu6&alu5&alu25));
      var alu26 = ((Ridx0*27)+(Ridx1*9)+(gidx2*1728));
      var val3 = data4_6912[(alu26+1)];
      var val4 = data4_6912[(alu26+3)];
      var val5 = data4_6912[alu26];
      var alu27 = (alu5&alu25);
      var val6 = select((f16(0.0f)), data1_268435456[(alu24+-65792)], alu27);
      var val7 = select((f16(0.0f)), data1_268435456[(alu24+-65791)], alu27);
      var val8 = data4_6912[(alu26+2)];
      var val9 = select((f16(0.0f)), data1_268435456[(alu24+-65537)], (alu6&alu25));
      var val10 = select((f16(0.0f)), data1_268435456[(alu24+-65536)], alu25);
      var val11 = data4_6912[(alu26+4)];
      var val12 = select((f16(0.0f)), data1_268435456[(alu24+-65535)], alu25);
      var val13 = data4_6912[(alu26+5)];
      var val14 = select((f16(0.0f)), data1_268435456[(alu24+-65281)], (alu6&alu3&alu25));
      var val15 = data4_6912[(alu26+6)];
      var alu28 = (alu3&alu25);
      var val16 = select((f16(0.0f)), data1_268435456[(alu24+-65280)], alu28);
      var val17 = data4_6912[(alu26+7)];
      var val18 = select((f16(0.0f)), data1_268435456[(alu24+-65279)], alu28);
      var val19 = data4_6912[(alu26+8)];
      var val20 = data4_6912[(alu26+432)];
      var val21 = data4_6912[(alu26+433)];
      var val22 = data4_6912[(alu26+434)];
      var val23 = data4_6912[(alu26+435)];
      var val24 = data4_6912[(alu26+436)];
      var val25 = data4_6912[(alu26+437)];
      var val26 = data4_6912[(alu26+438)];
      var val27 = data4_6912[(alu26+439)];
      var val28 = data4_6912[(alu26+440)];
      var val29 = data4_6912[(alu26+864)];
      var val30 = data4_6912[(alu26+865)];
      var val31 = data4_6912[(alu26+866)];
      var val32 = data4_6912[(alu26+867)];
      var val33 = data4_6912[(alu26+868)];
      var val34 = data4_6912[(alu26+869)];
      var val35 = data4_6912[(alu26+870)];
      var val36 = data4_6912[(alu26+871)];
      var val37 = data4_6912[(alu26+872)];
      var val38 = data4_6912[(alu26+1296)];
      var val39 = data4_6912[(alu26+1297)];
      var val40 = data4_6912[(alu26+1298)];
      var val41 = data4_6912[(alu26+1299)];
      var val42 = data4_6912[(alu26+1300)];
      var val43 = data4_6912[(alu26+1301)];
      var val44 = data4_6912[(alu26+1302)];
      var val45 = data4_6912[(alu26+1303)];
      var val46 = data4_6912[(alu26+1304)];
      var val47 = select((f16(0.0f)), data1_268435456[(alu24+-65790)], alu27);
      var val48 = select((f16(0.0f)), data1_268435456[(alu24+-65789)], alu27);
      var val49 = select((f16(0.0f)), data1_268435456[(alu24+-65788)], (alu4&alu5&alu25));
      var val50 = select((f16(0.0f)), data1_268435456[(alu24+-65534)], alu25);
      var val51 = select((f16(0.0f)), data1_268435456[(alu24+-65533)], alu25);
      var val52 = select((f16(0.0f)), data1_268435456[(alu24+-65532)], (alu4&alu25));
      var val53 = select((f16(0.0f)), data1_268435456[(alu24+-65278)], alu28);
      var val54 = select((f16(0.0f)), data1_268435456[(alu24+-65277)], alu28);
      var val55 = select((f16(0.0f)), data1_268435456[(alu24+-65276)], (alu4&alu3&alu25));
      var alu29 = ((val10-cast3)*cast4);
      var alu30 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu29+((f16(0.044715f))*alu29*alu29*alu29))*(f16(-2.302208198144325f))))))*alu29),alu25);
      var alu31 = ((val12-cast3)*cast4);
      var alu32 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu31+((f16(0.044715f))*alu31*alu31*alu31))*(f16(-2.302208198144325f))))))*alu31),alu25);
      var alu33 = ((val50-cast3)*cast4);
      var alu34 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu33+((f16(0.044715f))*alu33*alu33*alu33))*(f16(-2.302208198144325f))))))*alu33),alu25);
      var alu35 = ((val51-cast3)*cast4);
      var alu36 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu35+((f16(0.044715f))*alu35*alu35*alu35))*(f16(-2.302208198144325f))))))*alu35),alu25);
      var alu37 = ((val16-cast3)*cast4);
      var alu38 = (alu25&alu3);
      var alu39 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu37+((f16(0.044715f))*alu37*alu37*alu37))*(f16(-2.302208198144325f))))))*alu37),alu38);
      var alu40 = ((val18-cast3)*cast4);
      var alu41 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu40+((f16(0.044715f))*alu40*alu40*alu40))*(f16(-2.302208198144325f))))))*alu40),alu38);
      var alu42 = ((val53-cast3)*cast4);
      var alu43 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu42+((f16(0.044715f))*alu42*alu42*alu42))*(f16(-2.302208198144325f))))))*alu42),alu38);
      var alu44 = ((val54-cast3)*cast4);
      var alu45 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu44+((f16(0.044715f))*alu44*alu44*alu44))*(f16(-2.302208198144325f))))))*alu44),alu38);
      var alu46 = ((val52-cast3)*cast4);
      var alu47 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu46+((f16(0.044715f))*alu46*alu46*alu46))*(f16(-2.302208198144325f))))))*alu46),(alu25&alu4));
      var alu48 = ((val6-cast3)*cast4);
      var alu49 = (alu25&alu5);
      var alu50 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu48+((f16(0.044715f))*alu48*alu48*alu48))*(f16(-2.302208198144325f))))))*alu48),alu49);
      var alu51 = ((val7-cast3)*cast4);
      var alu52 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu51+((f16(0.044715f))*alu51*alu51*alu51))*(f16(-2.302208198144325f))))))*alu51),alu49);
      var alu53 = ((val47-cast3)*cast4);
      var alu54 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu53+((f16(0.044715f))*alu53*alu53*alu53))*(f16(-2.302208198144325f))))))*alu53),alu49);
      var alu55 = ((val48-cast3)*cast4);
      var alu56 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu55+((f16(0.044715f))*alu55*alu55*alu55))*(f16(-2.302208198144325f))))))*alu55),alu49);
      var alu57 = ((val9-cast3)*cast4);
      var alu58 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu57+((f16(0.044715f))*alu57*alu57*alu57))*(f16(-2.302208198144325f))))))*alu57),(alu25&alu6));
      var alu59 = ((val55-cast3)*cast4);
      var alu60 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu59+((f16(0.044715f))*alu59*alu59*alu59))*(f16(-2.302208198144325f))))))*alu59),(alu38&alu4));
      var alu61 = ((val14-cast3)*cast4);
      var alu62 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu61+((f16(0.044715f))*alu61*alu61*alu61))*(f16(-2.302208198144325f))))))*alu61),(alu38&alu6));
      var alu63 = ((val49-cast3)*cast4);
      var alu64 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu63+((f16(0.044715f))*alu63*alu63*alu63))*(f16(-2.302208198144325f))))))*alu63),(alu49&alu4));
      var alu65 = ((val2-cast3)*cast4);
      var alu66 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu65+((f16(0.044715f))*alu65*alu65*alu65))*(f16(-2.302208198144325f))))))*alu65),(alu49&alu6));
      acc0[0] = (acc0[0]+(f32((alu66*val5)))+(f32((alu50*val3)))+(f32((alu52*val8)))+(f32((alu58*val4)))+(f32((alu30*val11)))+(f32((alu32*val13)))+(f32((alu62*val15)))+(f32((alu39*val17)))+(f32((alu41*val19))));
      acc0[1] = (acc0[1]+(f32((alu66*val20)))+(f32((alu50*val21)))+(f32((alu52*val22)))+(f32((alu58*val23)))+(f32((alu30*val24)))+(f32((alu32*val25)))+(f32((alu62*val26)))+(f32((alu39*val27)))+(f32((alu41*val28))));
      acc0[2] = (acc0[2]+(f32((alu66*val29)))+(f32((alu50*val30)))+(f32((alu52*val31)))+(f32((alu58*val32)))+(f32((alu30*val33)))+(f32((alu32*val34)))+(f32((alu62*val35)))+(f32((alu39*val36)))+(f32((alu41*val37))));
      acc0[3] = (acc0[3]+(f32((alu66*val38)))+(f32((alu50*val39)))+(f32((alu52*val40)))+(f32((alu58*val41)))+(f32((alu30*val42)))+(f32((alu32*val43)))+(f32((alu62*val44)))+(f32((alu39*val45)))+(f32((alu41*val46))));
      acc0[4] = (acc0[4]+(f32((alu50*val5)))+(f32((alu52*val3)))+(f32((alu54*val8)))+(f32((alu30*val4)))+(f32((alu32*val11)))+(f32((alu34*val13)))+(f32((alu39*val15)))+(f32((alu41*val17)))+(f32((alu43*val19))));
      acc0[5] = (acc0[5]+(f32((alu50*val20)))+(f32((alu52*val21)))+(f32((alu54*val22)))+(f32((alu30*val23)))+(f32((alu32*val24)))+(f32((alu34*val25)))+(f32((alu39*val26)))+(f32((alu41*val27)))+(f32((alu43*val28))));
      acc0[6] = (acc0[6]+(f32((alu50*val29)))+(f32((alu52*val30)))+(f32((alu54*val31)))+(f32((alu30*val32)))+(f32((alu32*val33)))+(f32((alu34*val34)))+(f32((alu39*val35)))+(f32((alu41*val36)))+(f32((alu43*val37))));
      acc0[7] = (acc0[7]+(f32((alu50*val38)))+(f32((alu52*val39)))+(f32((alu54*val40)))+(f32((alu30*val41)))+(f32((alu32*val42)))+(f32((alu34*val43)))+(f32((alu39*val44)))+(f32((alu41*val45)))+(f32((alu43*val46))));
      acc0[8] = (acc0[8]+(f32((alu52*val5)))+(f32((alu54*val3)))+(f32((alu56*val8)))+(f32((alu32*val4)))+(f32((alu34*val11)))+(f32((alu36*val13)))+(f32((alu41*val15)))+(f32((alu43*val17)))+(f32((alu45*val19))));
      acc0[9] = (acc0[9]+(f32((alu52*val20)))+(f32((alu54*val21)))+(f32((alu56*val22)))+(f32((alu32*val23)))+(f32((alu34*val24)))+(f32((alu36*val25)))+(f32((alu41*val26)))+(f32((alu43*val27)))+(f32((alu45*val28))));
      acc0[10] = (acc0[10]+(f32((alu52*val29)))+(f32((alu54*val30)))+(f32((alu56*val31)))+(f32((alu32*val32)))+(f32((alu34*val33)))+(f32((alu36*val34)))+(f32((alu41*val35)))+(f32((alu43*val36)))+(f32((alu45*val37))));
      acc0[11] = (acc0[11]+(f32((alu52*val38)))+(f32((alu54*val39)))+(f32((alu56*val40)))+(f32((alu32*val41)))+(f32((alu34*val42)))+(f32((alu36*val43)))+(f32((alu41*val44)))+(f32((alu43*val45)))+(f32((alu45*val46))));
      acc0[12] = (acc0[12]+(f32((alu54*val5)))+(f32((alu56*val3)))+(f32((alu64*val8)))+(f32((alu34*val4)))+(f32((alu36*val11)))+(f32((alu47*val13)))+(f32((alu43*val15)))+(f32((alu45*val17)))+(f32((alu60*val19))));
      acc0[13] = (acc0[13]+(f32((alu54*val20)))+(f32((alu56*val21)))+(f32((alu64*val22)))+(f32((alu34*val23)))+(f32((alu36*val24)))+(f32((alu47*val25)))+(f32((alu43*val26)))+(f32((alu45*val27)))+(f32((alu60*val28))));
      acc0[14] = (acc0[14]+(f32((alu54*val29)))+(f32((alu56*val30)))+(f32((alu64*val31)))+(f32((alu34*val32)))+(f32((alu36*val33)))+(f32((alu47*val34)))+(f32((alu43*val35)))+(f32((alu45*val36)))+(f32((alu60*val37))));
      acc0[15] = (acc0[15]+(f32((alu54*val38)))+(f32((alu56*val39)))+(f32((alu64*val40)))+(f32((alu34*val41)))+(f32((alu36*val42)))+(f32((alu47*val43)))+(f32((alu43*val44)))+(f32((alu45*val45)))+(f32((alu60*val46))));
    }
  }
  var alu85 = (alu2+cast0+bitcast<i32>((bitcast<u32>(gidx2)<<26u)));
  data0_268435456[alu85] = (f16(acc0[0]));
  data0_268435456[(alu85+1)] = (f16(acc0[4]));
  data0_268435456[(alu85+2)] = (f16(acc0[8]));
  data0_268435456[(alu85+3)] = (f16(acc0[12]));
  data0_268435456[(alu85+16777216)] = (f16(acc0[1]));
  data0_268435456[(alu85+16777217)] = (f16(acc0[5]));
  data0_268435456[(alu85+16777218)] = (f16(acc0[9]));
  data0_268435456[(alu85+16777219)] = (f16(acc0[13]));
  data0_268435456[(alu85+33554432)] = (f16(acc0[2]));
  data0_268435456[(alu85+33554433)] = (f16(acc0[6]));
  data0_268435456[(alu85+33554434)] = (f16(acc0[10]));
  data0_268435456[(alu85+33554435)] = (f16(acc0[14]));
  data0_268435456[(alu85+50331648)] = (f16(acc0[3]));
  data0_268435456[(alu85+50331649)] = (f16(acc0[7]));
  data0_268435456[(alu85+50331650)] = (f16(acc0[11]));
  data0_268435456[(alu85+50331651)] = (f16(acc0[15]));
}`;

const r_4_256_32_4_8_16_4_4_16_3_3_3n9 = `enable f16;
fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0_268435456:array<f16>;
@group(0) @binding(2)var<storage,read_write>data1_268435456:array<f16>;
@group(0) @binding(3)var<storage,read_write>data2_16:array<f32>;
@group(0) @binding(4)var<storage,read_write>data3_16:array<f32>;
@group(0) @binding(5)var<storage,read_write>data4_6912:array<f16>;
@compute @workgroup_size(8,16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var acc0: array<f32,16>;
  var gidx0 = i32(gindex.x); /* 128 */
  var gidx1 = i32(gindex.y); /* 256 */
  var gidx2 = i32(gindex.z); /* 4 */
  var lidx0 = i32(lindex.x); /* 8 */
  var lidx1 = i32(lindex.y); /* 16 */
  var cast0 = bitcast<i32>((bitcast<u32>(gidx1)<<16u));
  var cast1 = bitcast<u32>((gidx0&3));
  var alu0 = (lidx1+bitcast<i32>((cast1<<4u)));
  var alu1 = (bitcast<i32>((bitcast<u32>(lidx0)<<8u))+bitcast<i32>((bitcast<u32>((gidx0>>2u))<<11u))+bitcast<i32>((bitcast<u32>(lidx1)<<2u))+bitcast<i32>((cast1<<6u)));
  var alu2 = (gidx0<120);
  var alu3 = (alu0<60);
  var alu4 = (3<alu0);
  var alu5 = (7<gidx0);
  acc0[0] = 0.0f;
  acc0[1] = 0.0f;
  acc0[2] = 0.0f;
  acc0[3] = 0.0f;
  acc0[4] = 0.0f;
  acc0[5] = 0.0f;
  acc0[6] = 0.0f;
  acc0[7] = 0.0f;
  acc0[8] = 0.0f;
  acc0[9] = 0.0f;
  acc0[10] = 0.0f;
  acc0[11] = 0.0f;
  acc0[12] = 0.0f;
  acc0[13] = 0.0f;
  acc0[14] = 0.0f;
  acc0[15] = 0.0f;
  for (var Ridx0 = 0; Ridx0 < 16; Ridx0++) {
    var val0 = data2_16[Ridx0];
    var val1 = data3_16[Ridx0];
    var cast2 = (f16(val0));
    var cast3 = (f16(val1));
    for (var Ridx1 = 0; Ridx1 < 3; Ridx1++) {
      var cast4 = bitcast<u32>(Ridx1);
      var alu22 = (gidx1+bitcast<i32>((cast4<<4u)));
      var alu23 = (alu1+cast0+bitcast<i32>((cast4<<20u))+bitcast<i32>((bitcast<u32>(Ridx0)<<24u)));
      var alu24 = ((15<alu22)&(alu22<272));
      var alu25 = (alu4&alu5&alu24);
      var val2 = select((f16(0.0f)), data1_268435456[(alu23+-1052688)], alu25);
      var alu26 = ((Ridx0*27)+(Ridx1*9)+(gidx2*1728));
      var val3 = data4_6912[alu26];
      var alu27 = (alu5&alu24);
      var val4 = select((f16(0.0f)), data1_268435456[(alu23+-1052672)], alu27);
      var val5 = data4_6912[(alu26+1)];
      var alu28 = (alu3&alu5&alu24);
      var val6 = select((f16(0.0f)), data1_268435456[(alu23+-1052656)], alu28);
      var val7 = data4_6912[(alu26+2)];
      var alu29 = (alu4&alu24);
      var val8 = select((f16(0.0f)), data1_268435456[(alu23+-1048592)], alu29);
      var val9 = data4_6912[(alu26+3)];
      var val10 = select((f16(0.0f)), data1_268435456[(alu23+-1048576)], alu24);
      var val11 = data4_6912[(alu26+4)];
      var alu30 = (alu3&alu24);
      var val12 = select((f16(0.0f)), data1_268435456[(alu23+-1048560)], alu30);
      var val13 = data4_6912[(alu26+5)];
      var alu31 = (alu4&alu2&alu24);
      var val14 = select((f16(0.0f)), data1_268435456[(alu23+-1044496)], alu31);
      var val15 = data4_6912[(alu26+6)];
      var alu32 = (alu2&alu24);
      var val16 = select((f16(0.0f)), data1_268435456[(alu23+-1044480)], alu32);
      var val17 = data4_6912[(alu26+7)];
      var alu33 = (alu3&alu2&alu24);
      var val18 = select((f16(0.0f)), data1_268435456[(alu23+-1044464)], alu33);
      var val19 = data4_6912[(alu26+8)];
      var val20 = data4_6912[(alu26+432)];
      var val21 = data4_6912[(alu26+433)];
      var val22 = data4_6912[(alu26+434)];
      var val23 = data4_6912[(alu26+435)];
      var val24 = data4_6912[(alu26+436)];
      var val25 = data4_6912[(alu26+437)];
      var val26 = data4_6912[(alu26+438)];
      var val27 = data4_6912[(alu26+439)];
      var val28 = data4_6912[(alu26+440)];
      var val29 = data4_6912[(alu26+864)];
      var val30 = data4_6912[(alu26+865)];
      var val31 = data4_6912[(alu26+866)];
      var val32 = data4_6912[(alu26+867)];
      var val33 = data4_6912[(alu26+868)];
      var val34 = data4_6912[(alu26+869)];
      var val35 = data4_6912[(alu26+870)];
      var val36 = data4_6912[(alu26+871)];
      var val37 = data4_6912[(alu26+872)];
      var val38 = data4_6912[(alu26+1296)];
      var val39 = data4_6912[(alu26+1297)];
      var val40 = data4_6912[(alu26+1298)];
      var val41 = data4_6912[(alu26+1299)];
      var val42 = data4_6912[(alu26+1300)];
      var val43 = data4_6912[(alu26+1301)];
      var val44 = data4_6912[(alu26+1302)];
      var val45 = data4_6912[(alu26+1303)];
      var val46 = data4_6912[(alu26+1304)];
      var val47 = select((f16(0.0f)), data1_268435456[(alu23+-1052687)], alu25);
      var val48 = select((f16(0.0f)), data1_268435456[(alu23+-1052686)], alu25);
      var val49 = select((f16(0.0f)), data1_268435456[(alu23+-1052685)], alu25);
      var val50 = select((f16(0.0f)), data1_268435456[(alu23+-1052671)], alu27);
      var val51 = select((f16(0.0f)), data1_268435456[(alu23+-1052670)], alu27);
      var val52 = select((f16(0.0f)), data1_268435456[(alu23+-1052669)], alu27);
      var val53 = select((f16(0.0f)), data1_268435456[(alu23+-1052655)], alu28);
      var val54 = select((f16(0.0f)), data1_268435456[(alu23+-1052654)], alu28);
      var val55 = select((f16(0.0f)), data1_268435456[(alu23+-1052653)], alu28);
      var val56 = select((f16(0.0f)), data1_268435456[(alu23+-1048591)], alu29);
      var val57 = select((f16(0.0f)), data1_268435456[(alu23+-1048590)], alu29);
      var val58 = select((f16(0.0f)), data1_268435456[(alu23+-1048589)], alu29);
      var val59 = select((f16(0.0f)), data1_268435456[(alu23+-1048575)], alu24);
      var val60 = select((f16(0.0f)), data1_268435456[(alu23+-1048574)], alu24);
      var val61 = select((f16(0.0f)), data1_268435456[(alu23+-1048573)], alu24);
      var val62 = select((f16(0.0f)), data1_268435456[(alu23+-1048559)], alu30);
      var val63 = select((f16(0.0f)), data1_268435456[(alu23+-1048558)], alu30);
      var val64 = select((f16(0.0f)), data1_268435456[(alu23+-1048557)], alu30);
      var val65 = select((f16(0.0f)), data1_268435456[(alu23+-1044495)], alu31);
      var val66 = select((f16(0.0f)), data1_268435456[(alu23+-1044494)], alu31);
      var val67 = select((f16(0.0f)), data1_268435456[(alu23+-1044493)], alu31);
      var val68 = select((f16(0.0f)), data1_268435456[(alu23+-1044479)], alu32);
      var val69 = select((f16(0.0f)), data1_268435456[(alu23+-1044478)], alu32);
      var val70 = select((f16(0.0f)), data1_268435456[(alu23+-1044477)], alu32);
      var val71 = select((f16(0.0f)), data1_268435456[(alu23+-1044463)], alu33);
      var val72 = select((f16(0.0f)), data1_268435456[(alu23+-1044462)], alu33);
      var val73 = select((f16(0.0f)), data1_268435456[(alu23+-1044461)], alu33);
      var alu34 = ((val10-cast2)*cast3);
      var alu35 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu34+((f16(0.044715f))*alu34*alu34*alu34))*(f16(-2.302208198144325f))))))*alu34),alu24);
      var alu36 = ((val59-cast2)*cast3);
      var alu37 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu36+((f16(0.044715f))*alu36*alu36*alu36))*(f16(-2.302208198144325f))))))*alu36),alu24);
      var alu38 = ((val60-cast2)*cast3);
      var alu39 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu38+((f16(0.044715f))*alu38*alu38*alu38))*(f16(-2.302208198144325f))))))*alu38),alu24);
      var alu40 = ((val61-cast2)*cast3);
      var alu41 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu40+((f16(0.044715f))*alu40*alu40*alu40))*(f16(-2.302208198144325f))))))*alu40),alu24);
      var alu42 = ((val16-cast2)*cast3);
      var alu43 = (alu24&alu2);
      var alu44 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu42+((f16(0.044715f))*alu42*alu42*alu42))*(f16(-2.302208198144325f))))))*alu42),alu43);
      var alu45 = ((val68-cast2)*cast3);
      var alu46 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu45+((f16(0.044715f))*alu45*alu45*alu45))*(f16(-2.302208198144325f))))))*alu45),alu43);
      var alu47 = ((val69-cast2)*cast3);
      var alu48 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu47+((f16(0.044715f))*alu47*alu47*alu47))*(f16(-2.302208198144325f))))))*alu47),alu43);
      var alu49 = ((val70-cast2)*cast3);
      var alu50 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu49+((f16(0.044715f))*alu49*alu49*alu49))*(f16(-2.302208198144325f))))))*alu49),alu43);
      var alu51 = ((val12-cast2)*cast3);
      var alu52 = (alu24&alu3);
      var alu53 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu51+((f16(0.044715f))*alu51*alu51*alu51))*(f16(-2.302208198144325f))))))*alu51),alu52);
      var alu54 = ((val62-cast2)*cast3);
      var alu55 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu54+((f16(0.044715f))*alu54*alu54*alu54))*(f16(-2.302208198144325f))))))*alu54),alu52);
      var alu56 = ((val63-cast2)*cast3);
      var alu57 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu56+((f16(0.044715f))*alu56*alu56*alu56))*(f16(-2.302208198144325f))))))*alu56),alu52);
      var alu58 = ((val64-cast2)*cast3);
      var alu59 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu58+((f16(0.044715f))*alu58*alu58*alu58))*(f16(-2.302208198144325f))))))*alu58),alu52);
      var alu60 = ((val8-cast2)*cast3);
      var alu61 = (alu24&alu4);
      var alu62 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu60+((f16(0.044715f))*alu60*alu60*alu60))*(f16(-2.302208198144325f))))))*alu60),alu61);
      var alu63 = ((val56-cast2)*cast3);
      var alu64 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu63+((f16(0.044715f))*alu63*alu63*alu63))*(f16(-2.302208198144325f))))))*alu63),alu61);
      var alu65 = ((val57-cast2)*cast3);
      var alu66 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu65+((f16(0.044715f))*alu65*alu65*alu65))*(f16(-2.302208198144325f))))))*alu65),alu61);
      var alu67 = ((val58-cast2)*cast3);
      var alu68 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu67+((f16(0.044715f))*alu67*alu67*alu67))*(f16(-2.302208198144325f))))))*alu67),alu61);
      var alu69 = ((val4-cast2)*cast3);
      var alu70 = (alu24&alu5);
      var alu71 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu69+((f16(0.044715f))*alu69*alu69*alu69))*(f16(-2.302208198144325f))))))*alu69),alu70);
      var alu72 = ((val50-cast2)*cast3);
      var alu73 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu72+((f16(0.044715f))*alu72*alu72*alu72))*(f16(-2.302208198144325f))))))*alu72),alu70);
      var alu74 = ((val51-cast2)*cast3);
      var alu75 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu74+((f16(0.044715f))*alu74*alu74*alu74))*(f16(-2.302208198144325f))))))*alu74),alu70);
      var alu76 = ((val52-cast2)*cast3);
      var alu77 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu76+((f16(0.044715f))*alu76*alu76*alu76))*(f16(-2.302208198144325f))))))*alu76),alu70);
      var alu78 = ((val18-cast2)*cast3);
      var alu79 = (alu43&alu3);
      var alu80 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu78+((f16(0.044715f))*alu78*alu78*alu78))*(f16(-2.302208198144325f))))))*alu78),alu79);
      var alu81 = ((val71-cast2)*cast3);
      var alu82 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu81+((f16(0.044715f))*alu81*alu81*alu81))*(f16(-2.302208198144325f))))))*alu81),alu79);
      var alu83 = ((val72-cast2)*cast3);
      var alu84 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu83+((f16(0.044715f))*alu83*alu83*alu83))*(f16(-2.302208198144325f))))))*alu83),alu79);
      var alu85 = ((val73-cast2)*cast3);
      var alu86 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu85+((f16(0.044715f))*alu85*alu85*alu85))*(f16(-2.302208198144325f))))))*alu85),alu79);
      var alu87 = ((val14-cast2)*cast3);
      var alu88 = (alu43&alu4);
      var alu89 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu87+((f16(0.044715f))*alu87*alu87*alu87))*(f16(-2.302208198144325f))))))*alu87),alu88);
      var alu90 = ((val65-cast2)*cast3);
      var alu91 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu90+((f16(0.044715f))*alu90*alu90*alu90))*(f16(-2.302208198144325f))))))*alu90),alu88);
      var alu92 = ((val66-cast2)*cast3);
      var alu93 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu92+((f16(0.044715f))*alu92*alu92*alu92))*(f16(-2.302208198144325f))))))*alu92),alu88);
      var alu94 = ((val67-cast2)*cast3);
      var alu95 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu94+((f16(0.044715f))*alu94*alu94*alu94))*(f16(-2.302208198144325f))))))*alu94),alu88);
      var alu96 = ((val6-cast2)*cast3);
      var alu97 = (alu70&alu3);
      var alu98 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu96+((f16(0.044715f))*alu96*alu96*alu96))*(f16(-2.302208198144325f))))))*alu96),alu97);
      var alu99 = ((val53-cast2)*cast3);
      var alu100 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu99+((f16(0.044715f))*alu99*alu99*alu99))*(f16(-2.302208198144325f))))))*alu99),alu97);
      var alu101 = ((val54-cast2)*cast3);
      var alu102 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu101+((f16(0.044715f))*alu101*alu101*alu101))*(f16(-2.302208198144325f))))))*alu101),alu97);
      var alu103 = ((val55-cast2)*cast3);
      var alu104 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu103+((f16(0.044715f))*alu103*alu103*alu103))*(f16(-2.302208198144325f))))))*alu103),alu97);
      var alu105 = ((val2-cast2)*cast3);
      var alu106 = (alu70&alu4);
      var alu107 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu105+((f16(0.044715f))*alu105*alu105*alu105))*(f16(-2.302208198144325f))))))*alu105),alu106);
      var alu108 = ((val47-cast2)*cast3);
      var alu109 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu108+((f16(0.044715f))*alu108*alu108*alu108))*(f16(-2.302208198144325f))))))*alu108),alu106);
      var alu110 = ((val48-cast2)*cast3);
      var alu111 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu110+((f16(0.044715f))*alu110*alu110*alu110))*(f16(-2.302208198144325f))))))*alu110),alu106);
      var alu112 = ((val49-cast2)*cast3);
      var alu113 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu112+((f16(0.044715f))*alu112*alu112*alu112))*(f16(-2.302208198144325f))))))*alu112),alu106);
      acc0[0] = (acc0[0]+(f32((alu107*val3)))+(f32((alu71*val5)))+(f32((alu98*val7)))+(f32((alu62*val9)))+(f32((alu35*val11)))+(f32((alu53*val13)))+(f32((alu89*val15)))+(f32((alu44*val17)))+(f32((alu80*val19))));
      acc0[1] = (acc0[1]+(f32((alu107*val20)))+(f32((alu71*val21)))+(f32((alu98*val22)))+(f32((alu62*val23)))+(f32((alu35*val24)))+(f32((alu53*val25)))+(f32((alu89*val26)))+(f32((alu44*val27)))+(f32((alu80*val28))));
      acc0[2] = (acc0[2]+(f32((alu107*val29)))+(f32((alu71*val30)))+(f32((alu98*val31)))+(f32((alu62*val32)))+(f32((alu35*val33)))+(f32((alu53*val34)))+(f32((alu89*val35)))+(f32((alu44*val36)))+(f32((alu80*val37))));
      acc0[3] = (acc0[3]+(f32((alu107*val38)))+(f32((alu71*val39)))+(f32((alu98*val40)))+(f32((alu62*val41)))+(f32((alu35*val42)))+(f32((alu53*val43)))+(f32((alu89*val44)))+(f32((alu44*val45)))+(f32((alu80*val46))));
      acc0[4] = (acc0[4]+(f32((alu109*val3)))+(f32((alu73*val5)))+(f32((alu100*val7)))+(f32((alu64*val9)))+(f32((alu37*val11)))+(f32((alu55*val13)))+(f32((alu91*val15)))+(f32((alu46*val17)))+(f32((alu82*val19))));
      acc0[5] = (acc0[5]+(f32((alu109*val20)))+(f32((alu73*val21)))+(f32((alu100*val22)))+(f32((alu64*val23)))+(f32((alu37*val24)))+(f32((alu55*val25)))+(f32((alu91*val26)))+(f32((alu46*val27)))+(f32((alu82*val28))));
      acc0[6] = (acc0[6]+(f32((alu109*val29)))+(f32((alu73*val30)))+(f32((alu100*val31)))+(f32((alu64*val32)))+(f32((alu37*val33)))+(f32((alu55*val34)))+(f32((alu91*val35)))+(f32((alu46*val36)))+(f32((alu82*val37))));
      acc0[7] = (acc0[7]+(f32((alu109*val38)))+(f32((alu73*val39)))+(f32((alu100*val40)))+(f32((alu64*val41)))+(f32((alu37*val42)))+(f32((alu55*val43)))+(f32((alu91*val44)))+(f32((alu46*val45)))+(f32((alu82*val46))));
      acc0[8] = (acc0[8]+(f32((alu111*val3)))+(f32((alu75*val5)))+(f32((alu102*val7)))+(f32((alu66*val9)))+(f32((alu39*val11)))+(f32((alu57*val13)))+(f32((alu93*val15)))+(f32((alu48*val17)))+(f32((alu84*val19))));
      acc0[9] = (acc0[9]+(f32((alu111*val20)))+(f32((alu75*val21)))+(f32((alu102*val22)))+(f32((alu66*val23)))+(f32((alu39*val24)))+(f32((alu57*val25)))+(f32((alu93*val26)))+(f32((alu48*val27)))+(f32((alu84*val28))));
      acc0[10] = (acc0[10]+(f32((alu111*val29)))+(f32((alu75*val30)))+(f32((alu102*val31)))+(f32((alu66*val32)))+(f32((alu39*val33)))+(f32((alu57*val34)))+(f32((alu93*val35)))+(f32((alu48*val36)))+(f32((alu84*val37))));
      acc0[11] = (acc0[11]+(f32((alu111*val38)))+(f32((alu75*val39)))+(f32((alu102*val40)))+(f32((alu66*val41)))+(f32((alu39*val42)))+(f32((alu57*val43)))+(f32((alu93*val44)))+(f32((alu48*val45)))+(f32((alu84*val46))));
      acc0[12] = (acc0[12]+(f32((alu113*val3)))+(f32((alu77*val5)))+(f32((alu104*val7)))+(f32((alu68*val9)))+(f32((alu41*val11)))+(f32((alu59*val13)))+(f32((alu95*val15)))+(f32((alu50*val17)))+(f32((alu86*val19))));
      acc0[13] = (acc0[13]+(f32((alu113*val20)))+(f32((alu77*val21)))+(f32((alu104*val22)))+(f32((alu68*val23)))+(f32((alu41*val24)))+(f32((alu59*val25)))+(f32((alu95*val26)))+(f32((alu50*val27)))+(f32((alu86*val28))));
      acc0[14] = (acc0[14]+(f32((alu113*val29)))+(f32((alu77*val30)))+(f32((alu104*val31)))+(f32((alu68*val32)))+(f32((alu41*val33)))+(f32((alu59*val34)))+(f32((alu95*val35)))+(f32((alu50*val36)))+(f32((alu86*val37))));
      acc0[15] = (acc0[15]+(f32((alu113*val38)))+(f32((alu77*val39)))+(f32((alu104*val40)))+(f32((alu68*val41)))+(f32((alu41*val42)))+(f32((alu59*val43)))+(f32((alu95*val44)))+(f32((alu50*val45)))+(f32((alu86*val46))));
    }
  }
  var alu132 = (alu1+cast0+bitcast<i32>((bitcast<u32>(gidx2)<<26u)));
  data0_268435456[alu132] = (f16(acc0[0]));
  data0_268435456[(alu132+1)] = (f16(acc0[4]));
  data0_268435456[(alu132+2)] = (f16(acc0[8]));
  data0_268435456[(alu132+3)] = (f16(acc0[12]));
  data0_268435456[(alu132+16777216)] = (f16(acc0[1]));
  data0_268435456[(alu132+16777217)] = (f16(acc0[5]));
  data0_268435456[(alu132+16777218)] = (f16(acc0[9]));
  data0_268435456[(alu132+16777219)] = (f16(acc0[13]));
  data0_268435456[(alu132+33554432)] = (f16(acc0[2]));
  data0_268435456[(alu132+33554433)] = (f16(acc0[6]));
  data0_268435456[(alu132+33554434)] = (f16(acc0[10]));
  data0_268435456[(alu132+33554435)] = (f16(acc0[14]));
  data0_268435456[(alu132+50331648)] = (f16(acc0[3]));
  data0_268435456[(alu132+50331649)] = (f16(acc0[7]));
  data0_268435456[(alu132+50331650)] = (f16(acc0[11]));
  data0_268435456[(alu132+50331651)] = (f16(acc0[15]));
}`;

const E_2_262144_8_16_4n1 = `enable f16;
fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0_268435456:array<f16>;
@group(0) @binding(2)var<storage,read_write>data1_268435456:array<f16>;
@group(0) @binding(3)var<storage,read_write>data2_16:array<f32>;
@group(0) @binding(4)var<storage,read_write>data3_16:array<f32>;
@compute @workgroup_size(8,16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 32768 */
  var gidx1 = i32(gindex.y); /* 16 */
  var lidx0 = i32(lindex.x); /* 8 */
  var lidx1 = i32(lindex.y); /* 16 */
  var cast0 = bitcast<u32>((gidx1&1));
  var alu0 = (bitcast<i32>((bitcast<u32>(gidx0)<<9u))+bitcast<i32>((bitcast<u32>((gidx1>>1u))<<6u))+bitcast<i32>((bitcast<u32>(lidx1)<<2u))+bitcast<i32>((bitcast<u32>(lidx0)<<24u))+bitcast<i32>((cast0<<27u)));
  var val0 = data1_268435456[alu0];
  var alu1 = (alu0+1);
  var val1 = data1_268435456[alu1];
  var alu2 = (alu0+2);
  var val2 = data1_268435456[alu2];
  var alu3 = (alu0+3);
  var val3 = data1_268435456[alu3];
  var alu4 = (lidx0+bitcast<i32>((cast0<<3u)));
  var val4 = data2_16[alu4];
  var val5 = data3_16[alu4];
  var cast1 = (f16(val4));
  var cast2 = (f16(val5));
  var alu5 = ((val0-cast1)*cast2);
  var alu6 = ((val1-cast1)*cast2);
  var alu7 = ((val2-cast1)*cast2);
  var alu8 = ((val3-cast1)*cast2);
  data0_268435456[alu0] = ((1/((f16(1.0f))+exp2(((alu5+((f16(0.044715f))*alu5*alu5*alu5))*(f16(-2.302208198144325f))))))*alu5);
  data0_268435456[alu1] = ((1/((f16(1.0f))+exp2(((alu6+((f16(0.044715f))*alu6*alu6*alu6))*(f16(-2.302208198144325f))))))*alu6);
  data0_268435456[alu2] = ((1/((f16(1.0f))+exp2(((alu7+((f16(0.044715f))*alu7*alu7*alu7))*(f16(-2.302208198144325f))))))*alu7);
  data0_268435456[alu3] = ((1/((f16(1.0f))+exp2(((alu8+((f16(0.044715f))*alu8*alu8*alu8))*(f16(-2.302208198144325f))))))*alu8);
}`;

const r_262144_2_16_4_16n1 = `enable f16;
fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0_33554432:array<f16>;
@group(0) @binding(2)var<storage,read_write>data1_268435456:array<f16>;
@group(0) @binding(3)var<storage,read_write>data2_32:array<f16>;
@group(0) @binding(4)var<storage,read_write>data3_2:array<f16>;
@compute @workgroup_size(2,16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 32768 */
  var gidx1 = i32(gindex.y); /* 8 */
  var lidx1 = i32(lindex.y); /* 16 */
  var alu0 = (bitcast<i32>((bitcast<u32>(gidx0)<<9u))+bitcast<i32>((bitcast<u32>(gidx1)<<6u))+bitcast<i32>((bitcast<u32>(lidx1)<<2u)));
  var val0 = data1_268435456[alu0];
  var lidx0 = i32(lindex.x); /* 2 */
  var cast0 = bitcast<u32>(lidx0);
  var cast1 = bitcast<i32>((cast0<<4u));
  var val1 = data2_32[cast1];
  var val2 = data1_268435456[(alu0+1)];
  var val3 = data1_268435456[(alu0+2)];
  var val4 = data1_268435456[(alu0+3)];
  var val5 = data1_268435456[(alu0+16777216)];
  var val6 = data2_32[(cast1+1)];
  var val7 = data1_268435456[(alu0+16777217)];
  var val8 = data1_268435456[(alu0+16777218)];
  var val9 = data1_268435456[(alu0+16777219)];
  var val10 = data1_268435456[(alu0+33554432)];
  var val11 = data2_32[(cast1+2)];
  var val12 = data1_268435456[(alu0+33554433)];
  var val13 = data1_268435456[(alu0+33554434)];
  var val14 = data1_268435456[(alu0+33554435)];
  var val15 = data1_268435456[(alu0+50331648)];
  var val16 = data2_32[(cast1+3)];
  var val17 = data1_268435456[(alu0+50331649)];
  var val18 = data1_268435456[(alu0+50331650)];
  var val19 = data1_268435456[(alu0+50331651)];
  var val20 = data1_268435456[(alu0+67108864)];
  var val21 = data2_32[(cast1+4)];
  var val22 = data1_268435456[(alu0+67108865)];
  var val23 = data1_268435456[(alu0+67108866)];
  var val24 = data1_268435456[(alu0+67108867)];
  var val25 = data1_268435456[(alu0+83886080)];
  var val26 = data2_32[(cast1+5)];
  var val27 = data1_268435456[(alu0+83886081)];
  var val28 = data1_268435456[(alu0+83886082)];
  var val29 = data1_268435456[(alu0+83886083)];
  var val30 = data1_268435456[(alu0+100663296)];
  var val31 = data2_32[(cast1+6)];
  var val32 = data1_268435456[(alu0+100663297)];
  var val33 = data1_268435456[(alu0+100663298)];
  var val34 = data1_268435456[(alu0+100663299)];
  var val35 = data1_268435456[(alu0+117440512)];
  var val36 = data2_32[(cast1+7)];
  var val37 = data1_268435456[(alu0+117440513)];
  var val38 = data1_268435456[(alu0+117440514)];
  var val39 = data1_268435456[(alu0+117440515)];
  var val40 = data1_268435456[(alu0+134217728)];
  var val41 = data2_32[(cast1+8)];
  var val42 = data1_268435456[(alu0+134217729)];
  var val43 = data1_268435456[(alu0+134217730)];
  var val44 = data1_268435456[(alu0+134217731)];
  var val45 = data1_268435456[(alu0+150994944)];
  var val46 = data2_32[(cast1+9)];
  var val47 = data1_268435456[(alu0+150994945)];
  var val48 = data1_268435456[(alu0+150994946)];
  var val49 = data1_268435456[(alu0+150994947)];
  var val50 = data1_268435456[(alu0+167772160)];
  var val51 = data2_32[(cast1+10)];
  var val52 = data1_268435456[(alu0+167772161)];
  var val53 = data1_268435456[(alu0+167772162)];
  var val54 = data1_268435456[(alu0+167772163)];
  var val55 = data1_268435456[(alu0+184549376)];
  var val56 = data2_32[(cast1+11)];
  var val57 = data1_268435456[(alu0+184549377)];
  var val58 = data1_268435456[(alu0+184549378)];
  var val59 = data1_268435456[(alu0+184549379)];
  var val60 = data1_268435456[(alu0+201326592)];
  var val61 = data2_32[(cast1+12)];
  var val62 = data1_268435456[(alu0+201326593)];
  var val63 = data1_268435456[(alu0+201326594)];
  var val64 = data1_268435456[(alu0+201326595)];
  var val65 = data1_268435456[(alu0+218103808)];
  var val66 = data2_32[(cast1+13)];
  var val67 = data1_268435456[(alu0+218103809)];
  var val68 = data1_268435456[(alu0+218103810)];
  var val69 = data1_268435456[(alu0+218103811)];
  var val70 = data1_268435456[(alu0+234881024)];
  var val71 = data2_32[(cast1+14)];
  var val72 = data1_268435456[(alu0+234881025)];
  var val73 = data1_268435456[(alu0+234881026)];
  var val74 = data1_268435456[(alu0+234881027)];
  var val75 = data1_268435456[(alu0+251658240)];
  var val76 = data2_32[(cast1+15)];
  var val77 = data3_2[lidx0];
  var val78 = data1_268435456[(alu0+251658241)];
  var val79 = data1_268435456[(alu0+251658242)];
  var val80 = data1_268435456[(alu0+251658243)];
  var alu1 = (alu0+bitcast<i32>((cast0<<24u)));
  data0_33554432[alu1] = ((f16(((f32((val0*val1)))+(f32((val5*val6)))+(f32((val10*val11)))+(f32((val15*val16)))+(f32((val20*val21)))+(f32((val25*val26)))+(f32((val30*val31)))+(f32((val35*val36)))+(f32((val40*val41)))+(f32((val45*val46)))+(f32((val50*val51)))+(f32((val55*val56)))+(f32((val60*val61)))+(f32((val65*val66)))+(f32((val70*val71)))+(f32((val75*val76))))))+val77);
  data0_33554432[(alu1+1)] = ((f16(((f32((val2*val1)))+(f32((val7*val6)))+(f32((val12*val11)))+(f32((val17*val16)))+(f32((val22*val21)))+(f32((val27*val26)))+(f32((val32*val31)))+(f32((val37*val36)))+(f32((val42*val41)))+(f32((val47*val46)))+(f32((val52*val51)))+(f32((val57*val56)))+(f32((val62*val61)))+(f32((val67*val66)))+(f32((val72*val71)))+(f32((val78*val76))))))+val77);
  data0_33554432[(alu1+2)] = ((f16(((f32((val3*val1)))+(f32((val8*val6)))+(f32((val13*val11)))+(f32((val18*val16)))+(f32((val23*val21)))+(f32((val28*val26)))+(f32((val33*val31)))+(f32((val38*val36)))+(f32((val43*val41)))+(f32((val48*val46)))+(f32((val53*val51)))+(f32((val58*val56)))+(f32((val63*val61)))+(f32((val68*val66)))+(f32((val73*val71)))+(f32((val79*val76))))))+val77);
  data0_33554432[(alu1+3)] = ((f16(((f32((val4*val1)))+(f32((val9*val6)))+(f32((val14*val11)))+(f32((val19*val16)))+(f32((val24*val21)))+(f32((val29*val26)))+(f32((val34*val31)))+(f32((val39*val36)))+(f32((val44*val41)))+(f32((val49*val46)))+(f32((val54*val51)))+(f32((val59*val56)))+(f32((val64*val61)))+(f32((val69*val66)))+(f32((val74*val71)))+(f32((val80*val76))))))+val77);
}`;

const r_131072_32_4_2n2 = `enable f16;
fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0_16777216:array<f16>;
@group(0) @binding(2)var<storage,read_write>data1_33554432:array<f16>;
@compute @workgroup_size(32) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 32768 */
  var gidx1 = i32(gindex.y); /* 4 */
  var lidx0 = i32(lindex.x); /* 32 */
  var alu0 = (bitcast<i32>((bitcast<u32>(gidx0)<<9u))+bitcast<i32>((bitcast<u32>(gidx1)<<7u))+bitcast<i32>((bitcast<u32>(lidx0)<<2u)));
  var val0 = data1_33554432[alu0];
  var alu1 = (alu0+1);
  var val1 = data1_33554432[alu1];
  var alu2 = (alu0+2);
  var val2 = data1_33554432[alu2];
  var alu3 = (alu0+3);
  var val3 = data1_33554432[alu3];
  var val4 = data1_33554432[(alu0+16777216)];
  var val5 = data1_33554432[(alu0+16777217)];
  var val6 = data1_33554432[(alu0+16777218)];
  var val7 = data1_33554432[(alu0+16777219)];
  var alu4 = select(val0,val4,(val0<val4));
  var alu5 = select(val1,val5,(val1<val5));
  var alu6 = select(val2,val6,(val2<val6));
  var alu7 = select(val3,val7,(val3<val7));
  data0_16777216[alu0] = alu4;
  data0_16777216[alu1] = alu5;
  data0_16777216[alu2] = alu6;
  data0_16777216[alu3] = alu7;
}`;

const r_131072_32_4_2n3 = `enable f16;
fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0_16777216:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1_33554432:array<f16>;
@group(0) @binding(3)var<storage,read_write>data2_16777216:array<f16>;
@compute @workgroup_size(32) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 32768 */
  var gidx1 = i32(gindex.y); /* 4 */
  var lidx0 = i32(lindex.x); /* 32 */
  var alu0 = (bitcast<i32>((bitcast<u32>(gidx0)<<9u))+bitcast<i32>((bitcast<u32>(gidx1)<<7u))+bitcast<i32>((bitcast<u32>(lidx0)<<2u)));
  var val0 = data1_33554432[alu0];
  var val1 = data2_16777216[alu0];
  var alu1 = (alu0+1);
  var val2 = data1_33554432[alu1];
  var alu2 = (alu0+2);
  var val3 = data1_33554432[alu2];
  var alu3 = (alu0+3);
  var val4 = data1_33554432[alu3];
  var val5 = data1_33554432[(alu0+16777216)];
  var val6 = data2_16777216[alu1];
  var val7 = data1_33554432[(alu0+16777217)];
  var val8 = data2_16777216[alu2];
  var val9 = data1_33554432[(alu0+16777218)];
  var val10 = data2_16777216[alu3];
  var val11 = data1_33554432[(alu0+16777219)];
  var cast0 = (i32((val5==val1)));
  var cast1 = (i32((val7==val6)));
  var cast2 = (i32((val9==val8)));
  var cast3 = (i32((val11==val10)));
  var cast4 = bitcast<i32>((bitcast<u32>((i32((val0==val1))))<<1u));
  var alu4 = select(cast4,cast0,(cast4<cast0));
  var cast5 = bitcast<i32>((bitcast<u32>((i32((val2==val6))))<<1u));
  var alu5 = select(cast5,cast1,(cast5<cast1));
  var cast6 = bitcast<i32>((bitcast<u32>((i32((val3==val8))))<<1u));
  var alu6 = select(cast6,cast2,(cast6<cast2));
  var cast7 = bitcast<i32>((bitcast<u32>((i32((val4==val10))))<<1u));
  var alu7 = select(cast7,cast3,(cast7<cast3));
  data0_16777216[alu0] = (f32((2-alu4)));
  data0_16777216[alu1] = (f32((2-alu5)));
  data0_16777216[alu2] = (f32((2-alu6)));
  data0_16777216[alu3] = (f32((2-alu7)));
}`;

const setupNet = async (device, safetensor) => {
    const metadata = getTensorMetadata(safetensor);
    const infinityBuf = createInfinityUniformBuf(device);

    const layouts=[device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]})]

    const input0 = createEmptyBuf(device, 33554432);;
    const buf_1 = createWeightBuf(device, 864, getTensorBuffer(safetensor, metadata['m.model.0.weight']));
    const buf_9 = createWeightBuf(device, 13824, getTensorBuffer(safetensor, metadata['m.model.3.weight']));
    const buf_17 = createWeightBuf(device, 13824, getTensorBuffer(safetensor, metadata['m.model.6.weight']));
    const buf_25 = createWeightBuf(device, 13824, getTensorBuffer(safetensor, metadata['m.model.9.weight']));
    const buf_33 = createWeightBuf(device, 13824, getTensorBuffer(safetensor, metadata['m.model.12.weight']));
    const buf_41 = createWeightBuf(device, 13824, getTensorBuffer(safetensor, metadata['m.model.15.weight']));
    const buf_49 = createWeightBuf(device, 13824, getTensorBuffer(safetensor, metadata['m.model.18.weight']));
    const buf_57 = createWeightBuf(device, 13824, getTensorBuffer(safetensor, metadata['m.model.21.weight']));
    const buf_65 = createWeightBuf(device, 13824, getTensorBuffer(safetensor, metadata['m.model.24.weight']));
    const buf_73 = createWeightBuf(device, 13824, getTensorBuffer(safetensor, metadata['m.model.27.weight']));
    const buf_81 = createWeightBuf(device, 13824, getTensorBuffer(safetensor, metadata['m.model.30.weight']));
    const buf_89 = createWeightBuf(device, 13824, getTensorBuffer(safetensor, metadata['m.model.33.weight']));
    const buf_97 = createWeightBuf(device, 13824, getTensorBuffer(safetensor, metadata['m.model.36.weight']));
    const buf_105 = createWeightBuf(device, 13824, getTensorBuffer(safetensor, metadata['m.model.39.weight']));
    const buf_113 = createWeightBuf(device, 13824, getTensorBuffer(safetensor, metadata['m.model.42.weight']));
    const buf_121 = createWeightBuf(device, 13824, getTensorBuffer(safetensor, metadata['m.model.45.weight']));
    const buf_129 = createWeightBuf(device, 13824, getTensorBuffer(safetensor, metadata['m.model.48.weight']));
    const buf_137 = createWeightBuf(device, 13824, getTensorBuffer(safetensor, metadata['m.model.51.weight']));
    const buf_145 = createWeightBuf(device, 13824, getTensorBuffer(safetensor, metadata['m.model.54.weight']));
    const buf_153 = createWeightBuf(device, 13824, getTensorBuffer(safetensor, metadata['m.model.57.weight']));
    const buf_161 = createWeightBuf(device, 13824, getTensorBuffer(safetensor, metadata['m.model.60.weight']));
    const buf_169 = createWeightBuf(device, 13824, getTensorBuffer(safetensor, metadata['m.model.63.weight']));
    const buf_177 = createWeightBuf(device, 13824, getTensorBuffer(safetensor, metadata['m.model.66.weight']));
    const buf_185 = createWeightBuf(device, 13824, getTensorBuffer(safetensor, metadata['m.model.69.weight']));
    const buf_193 = createWeightBuf(device, 13824, getTensorBuffer(safetensor, metadata['m.model.72.weight']));
    const buf_202 = createWeightBuf(device, 64, getTensorBuffer(safetensor, metadata['m.seq_conv_argmax.weight']));
    const buf_203 = createWeightBuf(device, 4, getTensorBuffer(safetensor, metadata['m.seq_conv_argmax.bias']));
    const output0 = createEmptyBuf(device, 67108864);;
    const arena_0 = createEmptyBuf(device, 536870912);;
    const arena_1 = createEmptyBuf(device, 4194304);;
    const arena_2 = createEmptyBuf(device, 536870912);;
    const arena_3 = createEmptyBuf(device, 536870912);;

    const gpuWriteBuffer0 = device.createBuffer({size:input0.size, usage: GPUBufferUsage.COPY_SRC | GPUBufferUsage.MAP_WRITE });

    const gpuReadBuffer0 = device.createBuffer({size:output0.size, usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ });

    const kernels = [r_4_256_32_4_8_16_4_4_3_3_3n1, r_8192_32_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n2, r_2_1024_8_16_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n3, r_4_256_32_4_8_16_4_4_16_3_3_3n5, r_8192_32_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n2, r_2_1024_8_16_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n3, r_4_256_32_4_8_16_4_4_16_3_3_3n6, r_8192_32_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n2, r_2_1024_8_16_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n3, r_4_256_32_4_8_16_4_4_16_3_3_3n7, r_8192_32_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n2, r_2_1024_8_16_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n3, r_4_256_32_4_8_16_4_4_16_3_3_3n8, r_8192_32_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n2, r_2_1024_8_16_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n3, r_4_256_32_4_8_16_4_4_16_3_3_3n9, r_8192_32_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n2, r_2_1024_8_16_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n3, r_4_256_32_4_8_16_4_4_16_3_3_3n5, r_8192_32_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n2, r_2_1024_8_16_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n3, r_4_256_32_4_8_16_4_4_16_3_3_3n6, r_8192_32_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n2, r_2_1024_8_16_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n3, r_4_256_32_4_8_16_4_4_16_3_3_3n7, r_8192_32_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n2, r_2_1024_8_16_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n3, r_4_256_32_4_8_16_4_4_16_3_3_3n8, r_8192_32_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n2, r_2_1024_8_16_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n3, r_4_256_32_4_8_16_4_4_16_3_3_3n9, r_8192_32_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n2, r_2_1024_8_16_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n3, r_4_256_32_4_8_16_4_4_16_3_3_3n5, r_8192_32_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n2, r_2_1024_8_16_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n3, r_4_256_32_4_8_16_4_4_16_3_3_3n6, r_8192_32_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n2, r_2_1024_8_16_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n3, r_4_256_32_4_8_16_4_4_16_3_3_3n7, r_8192_32_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n2, r_2_1024_8_16_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n3, r_4_256_32_4_8_16_4_4_16_3_3_3n8, r_8192_32_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n2, r_2_1024_8_16_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n3, r_4_256_32_4_8_16_4_4_16_3_3_3n9, r_8192_32_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n2, r_2_1024_8_16_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n3, r_4_256_32_4_8_16_4_4_16_3_3_3n5, r_8192_32_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n2, r_2_1024_8_16_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n3, r_4_256_32_4_8_16_4_4_16_3_3_3n6, r_8192_32_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n2, r_2_1024_8_16_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n3, r_4_256_32_4_8_16_4_4_16_3_3_3n7, r_8192_32_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n2, r_2_1024_8_16_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n3, r_4_256_32_4_8_16_4_4_16_3_3_3n8, r_8192_32_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n2, r_2_1024_8_16_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n3, r_4_256_32_4_8_16_4_4_16_3_3_3n9, r_8192_32_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n2, r_2_1024_8_16_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n3, r_4_256_32_4_8_16_4_4_16_3_3_3n5, r_8192_32_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n2, r_2_1024_8_16_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n3, r_4_256_32_4_8_16_4_4_16_3_3_3n6, r_8192_32_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n2, r_2_1024_8_16_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n3, r_4_256_32_4_8_16_4_4_16_3_3_3n7, r_8192_32_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n2, r_2_1024_8_16_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n3, r_4_256_32_4_8_16_4_4_16_3_3_3n8, r_8192_32_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n2, r_2_1024_8_16_4_64_4n1, r_32_32_4_64_4n1, r_16_16_16n3, E_2_262144_8_16_4n1, r_262144_2_16_4_16n1, r_131072_32_4_2n2, r_131072_32_4_2n3];
    const pipelines = await Promise.all(kernels.map(async (name, i) => {
      return await device.createComputePipelineAsync({
          layout: device.createPipelineLayout({
              bindGroupLayouts: [layouts[i]],
          }),
          compute: {
              module: device.createShaderModule({
                  code: name,
              }),
              entryPoint: "main",
          },
      });
  }))

    return async (_input0) => {
        let commandEncoder = device.createCommandEncoder();
        await gpuWriteBuffer0.mapAsync(GPUMapMode.WRITE);
        new Float16Array(gpuWriteBuffer0.getMappedRange()).set(_input0);
        gpuWriteBuffer0.unmap();
        commandEncoder.copyBufferToBuffer(gpuWriteBuffer0, 0, input0, 0, gpuWriteBuffer0.size);
        addComputePass(device, commandEncoder, pipelines[0], layouts[0], infinityBuf, [arena_0, input0, buf_1], [128, 256, 4]);
        addComputePass(device, commandEncoder, pipelines[1], layouts[1], infinityBuf, [arena_1, arena_0], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[2], layouts[2], infinityBuf, [arena_2, arena_1], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[3], layouts[3], infinityBuf, [arena_1, arena_2], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[4], layouts[4], infinityBuf, [arena_2, arena_0, arena_1], [1024, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[5], layouts[5], infinityBuf, [arena_3, arena_2], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[6], layouts[6], infinityBuf, [arena_2, arena_3], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[7], layouts[7], infinityBuf, [arena_3, arena_0, arena_1, arena_2, buf_9], [128, 256, 4]);
        addComputePass(device, commandEncoder, pipelines[8], layouts[8], infinityBuf, [arena_0, arena_3], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[9], layouts[9], infinityBuf, [arena_1, arena_0], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[10], layouts[10], infinityBuf, [arena_0, arena_1], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[11], layouts[11], infinityBuf, [arena_1, arena_3, arena_0], [1024, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[12], layouts[12], infinityBuf, [arena_2, arena_1], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[13], layouts[13], infinityBuf, [arena_1, arena_2], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[14], layouts[14], infinityBuf, [arena_2, arena_3, arena_0, arena_1, buf_17], [128, 256, 4]);
        addComputePass(device, commandEncoder, pipelines[15], layouts[15], infinityBuf, [arena_0, arena_2], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[16], layouts[16], infinityBuf, [arena_1, arena_0], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[17], layouts[17], infinityBuf, [arena_0, arena_1], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[18], layouts[18], infinityBuf, [arena_1, arena_2, arena_0], [1024, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[19], layouts[19], infinityBuf, [arena_3, arena_1], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[20], layouts[20], infinityBuf, [arena_1, arena_3], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[21], layouts[21], infinityBuf, [arena_3, arena_2, arena_0, arena_1, buf_25], [128, 256, 4]);
        addComputePass(device, commandEncoder, pipelines[22], layouts[22], infinityBuf, [arena_0, arena_3], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[23], layouts[23], infinityBuf, [arena_1, arena_0], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[24], layouts[24], infinityBuf, [arena_0, arena_1], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[25], layouts[25], infinityBuf, [arena_1, arena_3, arena_0], [1024, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[26], layouts[26], infinityBuf, [arena_2, arena_1], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[27], layouts[27], infinityBuf, [arena_1, arena_2], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[28], layouts[28], infinityBuf, [arena_2, arena_3, arena_0, arena_1, buf_33], [128, 256, 4]);
        addComputePass(device, commandEncoder, pipelines[29], layouts[29], infinityBuf, [arena_0, arena_2], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[30], layouts[30], infinityBuf, [arena_1, arena_0], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[31], layouts[31], infinityBuf, [arena_0, arena_1], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[32], layouts[32], infinityBuf, [arena_1, arena_2, arena_0], [1024, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[33], layouts[33], infinityBuf, [arena_3, arena_1], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[34], layouts[34], infinityBuf, [arena_1, arena_3], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[35], layouts[35], infinityBuf, [arena_3, arena_2, arena_0, arena_1, buf_41], [128, 256, 4]);
        addComputePass(device, commandEncoder, pipelines[36], layouts[36], infinityBuf, [arena_0, arena_3], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[37], layouts[37], infinityBuf, [arena_1, arena_0], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[38], layouts[38], infinityBuf, [arena_0, arena_1], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[39], layouts[39], infinityBuf, [arena_1, arena_3, arena_0], [1024, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[40], layouts[40], infinityBuf, [arena_2, arena_1], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[41], layouts[41], infinityBuf, [arena_1, arena_2], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[42], layouts[42], infinityBuf, [arena_2, arena_3, arena_0, arena_1, buf_49], [128, 256, 4]);
        addComputePass(device, commandEncoder, pipelines[43], layouts[43], infinityBuf, [arena_0, arena_2], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[44], layouts[44], infinityBuf, [arena_1, arena_0], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[45], layouts[45], infinityBuf, [arena_0, arena_1], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[46], layouts[46], infinityBuf, [arena_1, arena_2, arena_0], [1024, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[47], layouts[47], infinityBuf, [arena_3, arena_1], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[48], layouts[48], infinityBuf, [arena_1, arena_3], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[49], layouts[49], infinityBuf, [arena_3, arena_2, arena_0, arena_1, buf_57], [128, 256, 4]);
        addComputePass(device, commandEncoder, pipelines[50], layouts[50], infinityBuf, [arena_0, arena_3], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[51], layouts[51], infinityBuf, [arena_1, arena_0], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[52], layouts[52], infinityBuf, [arena_0, arena_1], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[53], layouts[53], infinityBuf, [arena_1, arena_3, arena_0], [1024, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[54], layouts[54], infinityBuf, [arena_2, arena_1], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[55], layouts[55], infinityBuf, [arena_1, arena_2], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[56], layouts[56], infinityBuf, [arena_2, arena_3, arena_0, arena_1, buf_65], [128, 256, 4]);
        addComputePass(device, commandEncoder, pipelines[57], layouts[57], infinityBuf, [arena_0, arena_2], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[58], layouts[58], infinityBuf, [arena_1, arena_0], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[59], layouts[59], infinityBuf, [arena_0, arena_1], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[60], layouts[60], infinityBuf, [arena_1, arena_2, arena_0], [1024, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[61], layouts[61], infinityBuf, [arena_3, arena_1], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[62], layouts[62], infinityBuf, [arena_1, arena_3], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[63], layouts[63], infinityBuf, [arena_3, arena_2, arena_0, arena_1, buf_73], [128, 256, 4]);
        addComputePass(device, commandEncoder, pipelines[64], layouts[64], infinityBuf, [arena_0, arena_3], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[65], layouts[65], infinityBuf, [arena_1, arena_0], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[66], layouts[66], infinityBuf, [arena_0, arena_1], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[67], layouts[67], infinityBuf, [arena_1, arena_3, arena_0], [1024, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[68], layouts[68], infinityBuf, [arena_2, arena_1], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[69], layouts[69], infinityBuf, [arena_1, arena_2], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[70], layouts[70], infinityBuf, [arena_2, arena_3, arena_0, arena_1, buf_81], [128, 256, 4]);
        addComputePass(device, commandEncoder, pipelines[71], layouts[71], infinityBuf, [arena_0, arena_2], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[72], layouts[72], infinityBuf, [arena_1, arena_0], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[73], layouts[73], infinityBuf, [arena_0, arena_1], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[74], layouts[74], infinityBuf, [arena_1, arena_2, arena_0], [1024, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[75], layouts[75], infinityBuf, [arena_3, arena_1], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[76], layouts[76], infinityBuf, [arena_1, arena_3], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[77], layouts[77], infinityBuf, [arena_3, arena_2, arena_0, arena_1, buf_89], [128, 256, 4]);
        addComputePass(device, commandEncoder, pipelines[78], layouts[78], infinityBuf, [arena_0, arena_3], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[79], layouts[79], infinityBuf, [arena_1, arena_0], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[80], layouts[80], infinityBuf, [arena_0, arena_1], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[81], layouts[81], infinityBuf, [arena_1, arena_3, arena_0], [1024, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[82], layouts[82], infinityBuf, [arena_2, arena_1], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[83], layouts[83], infinityBuf, [arena_1, arena_2], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[84], layouts[84], infinityBuf, [arena_2, arena_3, arena_0, arena_1, buf_97], [128, 256, 4]);
        addComputePass(device, commandEncoder, pipelines[85], layouts[85], infinityBuf, [arena_0, arena_2], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[86], layouts[86], infinityBuf, [arena_1, arena_0], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[87], layouts[87], infinityBuf, [arena_0, arena_1], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[88], layouts[88], infinityBuf, [arena_1, arena_2, arena_0], [1024, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[89], layouts[89], infinityBuf, [arena_3, arena_1], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[90], layouts[90], infinityBuf, [arena_1, arena_3], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[91], layouts[91], infinityBuf, [arena_3, arena_2, arena_0, arena_1, buf_105], [128, 256, 4]);
        addComputePass(device, commandEncoder, pipelines[92], layouts[92], infinityBuf, [arena_0, arena_3], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[93], layouts[93], infinityBuf, [arena_1, arena_0], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[94], layouts[94], infinityBuf, [arena_0, arena_1], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[95], layouts[95], infinityBuf, [arena_1, arena_3, arena_0], [1024, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[96], layouts[96], infinityBuf, [arena_2, arena_1], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[97], layouts[97], infinityBuf, [arena_1, arena_2], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[98], layouts[98], infinityBuf, [arena_2, arena_3, arena_0, arena_1, buf_113], [128, 256, 4]);
        addComputePass(device, commandEncoder, pipelines[99], layouts[99], infinityBuf, [arena_0, arena_2], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[100], layouts[100], infinityBuf, [arena_1, arena_0], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[101], layouts[101], infinityBuf, [arena_0, arena_1], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[102], layouts[102], infinityBuf, [arena_1, arena_2, arena_0], [1024, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[103], layouts[103], infinityBuf, [arena_3, arena_1], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[104], layouts[104], infinityBuf, [arena_1, arena_3], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[105], layouts[105], infinityBuf, [arena_3, arena_2, arena_0, arena_1, buf_121], [128, 256, 4]);
        addComputePass(device, commandEncoder, pipelines[106], layouts[106], infinityBuf, [arena_0, arena_3], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[107], layouts[107], infinityBuf, [arena_1, arena_0], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[108], layouts[108], infinityBuf, [arena_0, arena_1], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[109], layouts[109], infinityBuf, [arena_1, arena_3, arena_0], [1024, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[110], layouts[110], infinityBuf, [arena_2, arena_1], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[111], layouts[111], infinityBuf, [arena_1, arena_2], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[112], layouts[112], infinityBuf, [arena_2, arena_3, arena_0, arena_1, buf_129], [128, 256, 4]);
        addComputePass(device, commandEncoder, pipelines[113], layouts[113], infinityBuf, [arena_0, arena_2], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[114], layouts[114], infinityBuf, [arena_1, arena_0], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[115], layouts[115], infinityBuf, [arena_0, arena_1], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[116], layouts[116], infinityBuf, [arena_1, arena_2, arena_0], [1024, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[117], layouts[117], infinityBuf, [arena_3, arena_1], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[118], layouts[118], infinityBuf, [arena_1, arena_3], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[119], layouts[119], infinityBuf, [arena_3, arena_2, arena_0, arena_1, buf_137], [128, 256, 4]);
        addComputePass(device, commandEncoder, pipelines[120], layouts[120], infinityBuf, [arena_0, arena_3], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[121], layouts[121], infinityBuf, [arena_1, arena_0], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[122], layouts[122], infinityBuf, [arena_0, arena_1], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[123], layouts[123], infinityBuf, [arena_1, arena_3, arena_0], [1024, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[124], layouts[124], infinityBuf, [arena_2, arena_1], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[125], layouts[125], infinityBuf, [arena_1, arena_2], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[126], layouts[126], infinityBuf, [arena_2, arena_3, arena_0, arena_1, buf_145], [128, 256, 4]);
        addComputePass(device, commandEncoder, pipelines[127], layouts[127], infinityBuf, [arena_0, arena_2], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[128], layouts[128], infinityBuf, [arena_1, arena_0], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[129], layouts[129], infinityBuf, [arena_0, arena_1], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[130], layouts[130], infinityBuf, [arena_1, arena_2, arena_0], [1024, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[131], layouts[131], infinityBuf, [arena_3, arena_1], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[132], layouts[132], infinityBuf, [arena_1, arena_3], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[133], layouts[133], infinityBuf, [arena_3, arena_2, arena_0, arena_1, buf_153], [128, 256, 4]);
        addComputePass(device, commandEncoder, pipelines[134], layouts[134], infinityBuf, [arena_0, arena_3], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[135], layouts[135], infinityBuf, [arena_1, arena_0], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[136], layouts[136], infinityBuf, [arena_0, arena_1], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[137], layouts[137], infinityBuf, [arena_1, arena_3, arena_0], [1024, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[138], layouts[138], infinityBuf, [arena_2, arena_1], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[139], layouts[139], infinityBuf, [arena_1, arena_2], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[140], layouts[140], infinityBuf, [arena_2, arena_3, arena_0, arena_1, buf_161], [128, 256, 4]);
        addComputePass(device, commandEncoder, pipelines[141], layouts[141], infinityBuf, [arena_0, arena_2], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[142], layouts[142], infinityBuf, [arena_1, arena_0], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[143], layouts[143], infinityBuf, [arena_0, arena_1], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[144], layouts[144], infinityBuf, [arena_1, arena_2, arena_0], [1024, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[145], layouts[145], infinityBuf, [arena_3, arena_1], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[146], layouts[146], infinityBuf, [arena_1, arena_3], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[147], layouts[147], infinityBuf, [arena_3, arena_2, arena_0, arena_1, buf_169], [128, 256, 4]);
        addComputePass(device, commandEncoder, pipelines[148], layouts[148], infinityBuf, [arena_0, arena_3], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[149], layouts[149], infinityBuf, [arena_1, arena_0], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[150], layouts[150], infinityBuf, [arena_0, arena_1], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[151], layouts[151], infinityBuf, [arena_1, arena_3, arena_0], [1024, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[152], layouts[152], infinityBuf, [arena_2, arena_1], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[153], layouts[153], infinityBuf, [arena_1, arena_2], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[154], layouts[154], infinityBuf, [arena_2, arena_3, arena_0, arena_1, buf_177], [128, 256, 4]);
        addComputePass(device, commandEncoder, pipelines[155], layouts[155], infinityBuf, [arena_0, arena_2], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[156], layouts[156], infinityBuf, [arena_1, arena_0], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[157], layouts[157], infinityBuf, [arena_0, arena_1], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[158], layouts[158], infinityBuf, [arena_1, arena_2, arena_0], [1024, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[159], layouts[159], infinityBuf, [arena_3, arena_1], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[160], layouts[160], infinityBuf, [arena_1, arena_3], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[161], layouts[161], infinityBuf, [arena_3, arena_2, arena_0, arena_1, buf_185], [128, 256, 4]);
        addComputePass(device, commandEncoder, pipelines[162], layouts[162], infinityBuf, [arena_0, arena_3], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[163], layouts[163], infinityBuf, [arena_1, arena_0], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[164], layouts[164], infinityBuf, [arena_0, arena_1], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[165], layouts[165], infinityBuf, [arena_1, arena_3, arena_0], [1024, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[166], layouts[166], infinityBuf, [arena_2, arena_1], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[167], layouts[167], infinityBuf, [arena_1, arena_2], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[168], layouts[168], infinityBuf, [arena_2, arena_3, arena_0, arena_1, buf_193], [128, 256, 4]);
        addComputePass(device, commandEncoder, pipelines[169], layouts[169], infinityBuf, [arena_0, arena_2], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[170], layouts[170], infinityBuf, [arena_1, arena_0], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[171], layouts[171], infinityBuf, [arena_0, arena_1], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[172], layouts[172], infinityBuf, [arena_1, arena_2, arena_0], [1024, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[173], layouts[173], infinityBuf, [arena_3, arena_1], [32, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[174], layouts[174], infinityBuf, [arena_1, arena_3], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[175], layouts[175], infinityBuf, [arena_3, arena_2, arena_0, arena_1], [32768, 16, 1]);
        addComputePass(device, commandEncoder, pipelines[176], layouts[176], infinityBuf, [arena_0, arena_3, buf_202, buf_203], [32768, 8, 1]);
        addComputePass(device, commandEncoder, pipelines[177], layouts[177], infinityBuf, [arena_2, arena_0], [32768, 4, 1]);
        addComputePass(device, commandEncoder, pipelines[178], layouts[178], infinityBuf, [output0, arena_0, arena_2], [32768, 4, 1]);
        commandEncoder.copyBufferToBuffer(output0, 0, gpuReadBuffer0, 0, output0.size);
        device.queue.submit([commandEncoder.finish()]);

        await gpuReadBuffer0.mapAsync(GPUMapMode.READ);
        const resultBuffer0 = new Float32Array(gpuReadBuffer0.size/4);
        resultBuffer0.set(new Float32Array(gpuReadBuffer0.getMappedRange()));
        gpuReadBuffer0.unmap();
        return [resultBuffer0];
    }
}
const load = async (device, weight_path) => { return await fetch(weight_path).then(x => x.arrayBuffer()).then(x => setupNet(device, new Uint8Array(x))); }
return { load, setupNet };
})();
export default rodent;
