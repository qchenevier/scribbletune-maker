import * as scribble from "scribbletune";

function createSession(instrument) {
  const session = new scribble.Session();
  const channel = session.createChannel({
    idx: 0,
    instrument: instrument,
    clips: [
      {
        notes: "CM-3 ".repeat(4) + "DM7-3 ".repeat(4) + "GM-2 ".repeat(4),
        pattern: "[xx_-]".repeat(12)
      }
    ]
  });

  session.startRow(0);
  return session;
}
export default createSession;
