import vomEmergency from '../data/vomEmergency.json';
import { configs } from '../configs/configs';
function transformEmergencyType(type) {
  const mapping = configs.mappingForVom
  return mapping[type] || type;
}

export function transformData(data) {
  const transformedType = transformEmergencyType(data.emergencyType);
  console.log("data in transformData", transformedType)
  
  const result = {};
  
  for (const key in vomEmergency) {
    console.log("i am KEYYY", key)
    if (transformedType in vomEmergency[key]) {
      result[key] = vomEmergency[key][transformedType];
    }
  }

  console.log("transformedType", transformedType, result);
  
  return result;
}