function getInfinityHitLocation(
  result: number | string,
  type: string = "human"
) {
  const resultNum = Number(result);
  let hitLocation = "";
  switch (true) {
    case resultNum >= 1 && resultNum <= 2:
      hitLocation = "Head";
      break;
    case resultNum >= 3 && resultNum <= 5:
      hitLocation = "Right Arm";
      break;
    case resultNum >= 6 && resultNum <= 8:
      hitLocation = "Left Arm";
      break;
    case resultNum >= 9 && resultNum <= 14:
      hitLocation = "Torso";
      break;
    case resultNum >= 15 && resultNum <= 17:
      hitLocation = "Right Leg";
      break;
    case resultNum >= 18 && resultNum <= 20:
      hitLocation = "Left Leg";
      break;
  }
  return hitLocation;
}

export default getInfinityHitLocation;
