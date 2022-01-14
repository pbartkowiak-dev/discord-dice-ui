function getWarhammer2eHitLocation(
  result: number | string,
  type: string = "human"
) {
  const resultNum = Number(result);
  let hitLocation = "";

  if (type === "human") {
    switch (true) {
      case resultNum >= 1 && resultNum <= 15:
        hitLocation = "Head";
        break;
      case resultNum >= 16 && resultNum <= 35:
        hitLocation = "Right Arm";
        break;
      case resultNum >= 36 && resultNum <= 55:
        hitLocation = "Left Arm";
        break;
      case resultNum >= 56 && resultNum <= 80:
        hitLocation = "Body";
        break;
      case resultNum >= 81 && resultNum <= 90:
        hitLocation = "Right Leg";
        break;
      case (resultNum >= 91 && resultNum <= 99) || resultNum === 0:
        hitLocation = "Left Leg";
        break;
    }
  } else {
    hitLocation = "Body";
  }
  return hitLocation;
}

export default getWarhammer2eHitLocation;
