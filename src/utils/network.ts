const stunServers = [
  "stun.l.google.com:19302",
  "stun1.l.google.com:19302",
  "stun2.l.google.com:19302",
  "stun3.l.google.com:19302",
  "stun4.l.google.com:19302",
  "stun01.sipphone.com",
  "stun.ekiga.net",
  "stun.fwdnet.net",
  "stun.ideasip.com",
  "stun.iptel.org",
  "stun.rixtelecom.se",
  "stun.schlund.de",
  "stunserver.org",
  "stun.softjoys.com",
  "stun.voiparound.com",
  "stun.voipbuster.com",
  "stun.voipstunt.com",
  "stun.voxgratia.org",
  "stun.xten.com",
];

export const getClientIpAddress = async (): Promise<{
  local: string;
  external: string;
}> => {
  const pc = new RTCPeerConnection({
    iceServers: stunServers.map((url) => ({ urls: `stun:${url}` })),
  });

  pc.createDataChannel("");

  const offer = await pc.createOffer();
  pc.setLocalDescription(offer);

  return new Promise((resolve, reject) => {
    let local;
    let external;

    pc.onicecandidate = (ice) => {
      try {
        if (!ice || !ice.candidate || !ice.candidate.candidate) {
          pc.close();
          resolve({ local, external });
          return;
        }

        const [, , , , ipAddress, , , host] = ice.candidate.candidate.split(
          " "
        );
        switch (host) {
          case "host":
            local = ipAddress;
            break;

          default:
            external = ipAddress;
            break;
        }
      } catch (err) {
        reject(err);
      }
    };

    const interval = setInterval(() => {
      if (local && external) {
        clearInterval(interval);
        resolve({ local, external });
      }
    }, 100);
  });
};
