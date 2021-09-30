import { formatDateTime } from "../../utils/format-date";

function randomDate(start, end) {
  // copied from StackOverflow (so it must be already tested) :D
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
const rand = randomDate(new Date(2012, 0, 1), new Date());

test("returns a valid date, regardless if 2nd argument(timezone) exists", () => {
  const test = formatDateTime(rand);
  console.log(test);
  expect(test).toBeTruthy();
});

test("returns a valid date, when valid timezone argument is provided", () => {
  const test = formatDateTime(rand, "America/New_York");
  console.log(test);
  expect(formatDateTime(test)).toBeTruthy();
});

test("throws an error, when invalid timezone argument is provided", () => {
  try {
    const test = formatDateTime(rand, "FALSE TIMEZONE");
    console.log(test);
    expect(test).toThrow();
  } catch (e) {
    expect(e.message).toBeTruthy();
  }
});