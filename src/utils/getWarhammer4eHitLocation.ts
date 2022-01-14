function getWarhammer4eHitLocation(result: number | string) {
  const resultNum = Number(result);
  let hitLocation = "";

  switch (true) {
    case resultNum >= 1 && resultNum <= 9:
      hitLocation = "Head";
      break;
    case resultNum >= 10 && resultNum <= 24:
      hitLocation = "Left Arm (or Secondary Arm)";
      break;
    case resultNum >= 25 && resultNum <= 44:
      hitLocation = "Right Arm (or Primary Arm)";
      break;
    case resultNum >= 45 && resultNum <= 79:
      hitLocation = "Body";
      break;
    case resultNum >= 80 && resultNum <= 89:
      hitLocation = "Left Leg";
      break;
    case (resultNum >= 90 && resultNum <= 99) || resultNum === 0:
      hitLocation = "Right Leg";
      break;
  }
  return hitLocation;
}

export default getWarhammer4eHitLocation;
