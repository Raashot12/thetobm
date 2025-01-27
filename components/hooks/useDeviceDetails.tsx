import { useEffect, useState } from 'react';
import UAParser from 'ua-parser-js';

const useDeviceDetails = () => {
  const [deviceInfo, setDeviceInfo] = useState({ device: 'Unknown', os: 'Unknown' });

  useEffect(() => {
    const parser = new UAParser();
    const result = parser.getResult();

    let deviceType = 'Unknown';
    if (result.device.type === 'mobile') {
      deviceType = 'Mobile';
    } else if (result.device.type === 'tablet') {
      deviceType = 'Tablet';
    } else if (result.device.type === 'desktop' || !result.device.type) {
      deviceType = 'Desktop';
    }

    let osType = 'Unknown';
    if (result.os.name) {
      osType = result.os.name;
    }

    setDeviceInfo({ device: deviceType, os: osType });
  }, []);

  return deviceInfo;
};

export default useDeviceDetails;
