import { GatewayDevice } from "../types/GatewayDevice";

export const codeunityDevices: GatewayDevice[] = [
  {
    deviceModel: "dx4",
    isCloudConnectionUp: {
      settable: false,
      value: true,
    },
    managementPoints: [
      {
        embeddedId: "gateway",
        managementPointType: "gateway",
        managementPointCategory: "secondary",
        errorCode: {
          settable: false,
          value: "",
        },
        firmwareVersion: {
          settable: false,
          value: "1_31_0",
        },
        isFirmwareUpdateSupported: {
          settable: false,
          value: true,
        },
        isInErrorState: {
          settable: false,
          value: false,
        },
        ipAddress: {
          settable: false,
          value: "192.168.10.123",
        },
        macAddress: {
          settable: false,
          value: "b0:65:3a:69:55:f2",
        },
        modelInfo: {
          settable: false,
          value: "BRP069C4x",
        },
        serialNumber: {
          settable: false,
          value: "0000000012354932",
        },
        ssid: {
          settable: false,
          value: "DaikinAP77602",
        },
      },
      {
        embeddedId: "climateControl",
        managementPointType: "climateControl",
        managementPointSubType: "mainZone",
        managementPointCategory: "primary",
        consumptionData: {
          ref: "#consumptionData",
          settable: false,
          value: {
            electrical: {
              unit: "kWh",
              heating: {
                d: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                w: [0, 0, 0, 0, 0, 0, 0, 0, 0, null, null, null, null, null],
                m: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              },
              cooling: {
                d: [0, 0, 0, 0.2, 0.5, 0.4, 0.5, 0.6, 0.5, 0, 0, 0, 0, 0, 0, 0, 0.2, 0.4, 0.5, 0.5, 0, 0, 0, 0],
                w: [2, 1.9, 2.1, 0, 1.8, 0, 0, 2.7, 1.6, null, null, null, null, null],
                m: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.9, 17.8, 0, 0, 0, 0, 0, 0],
              },
            },
          },
        },
        errorCode: {
          settable: false,
          value: "00-00",
        },
        fanControl: {
          ref: "#fanControl",
          settable: true,
          value: {
            operationModes: {
              heating: {
                fanSpeed: {
                  currentMode: {
                    value: "auto",
                    settable: true,
                    values: ["auto", "quiet", "fixed"],
                  },
                  modes: {
                    fixed: {
                      value: 1,
                      stepValue: 1,
                      minValue: 1,
                      maxValue: 5,
                      settable: true,
                    },
                  },
                },
                fanDirection: {
                  horizontal: {
                    currentMode: {
                      value: "stop",
                      settable: true,
                      values: ["stop", "swing"],
                    },
                  },
                  vertical: {
                    currentMode: {
                      value: "stop",
                      settable: true,
                      values: ["stop", "swing", "windNice"],
                    },
                  },
                },
              },
              cooling: {
                fanSpeed: {
                  currentMode: {
                    value: "fixed",
                    settable: true,
                    values: ["auto", "quiet", "fixed"],
                  },
                  modes: {
                    fixed: {
                      value: 2,
                      stepValue: 1,
                      minValue: 1,
                      maxValue: 5,
                      settable: true,
                    },
                  },
                },
                fanDirection: {
                  horizontal: {
                    currentMode: {
                      value: "stop",
                      settable: true,
                      values: ["stop", "swing"],
                    },
                  },
                  vertical: {
                    currentMode: {
                      value: "stop",
                      settable: true,
                      values: ["stop", "swing", "windNice"],
                    },
                  },
                },
              },
              auto: {
                fanSpeed: {
                  currentMode: {
                    value: "fixed",
                    settable: true,
                    values: ["auto", "quiet", "fixed"],
                  },
                  modes: {
                    fixed: {
                      value: 3,
                      stepValue: 1,
                      minValue: 1,
                      maxValue: 5,
                      settable: true,
                    },
                  },
                },
                fanDirection: {
                  horizontal: {
                    currentMode: {
                      value: "stop",
                      settable: true,
                      values: ["stop", "swing"],
                    },
                  },
                  vertical: {
                    currentMode: {
                      value: "stop",
                      settable: true,
                      values: ["stop", "swing", "windNice"],
                    },
                  },
                },
              },
              dry: {
                fanSpeed: {
                  currentMode: {
                    value: "auto",
                    settable: true,
                    values: ["auto"],
                  },
                },
                fanDirection: {
                  horizontal: {
                    currentMode: {
                      value: "stop",
                      settable: true,
                      values: ["stop", "swing"],
                    },
                  },
                  vertical: {
                    currentMode: {
                      value: "stop",
                      settable: true,
                      values: ["stop", "swing", "windNice"],
                    },
                  },
                },
              },
              fanOnly: {
                fanSpeed: {
                  currentMode: {
                    value: "fixed",
                    settable: true,
                    values: ["auto", "quiet", "fixed"],
                  },
                  modes: {
                    fixed: {
                      value: 3,
                      stepValue: 1,
                      minValue: 1,
                      maxValue: 5,
                      settable: true,
                    },
                  },
                },
                fanDirection: {
                  horizontal: {
                    currentMode: {
                      value: "stop",
                      settable: true,
                      values: ["stop", "swing"],
                    },
                  },
                  vertical: {
                    currentMode: {
                      value: "stop",
                      settable: true,
                      values: ["stop", "swing"],
                    },
                  },
                },
              },
            },
          },
        },
        holidayMode: {
          ref: "#holidayMode",
          settable: true,
          value: {
            enabled: false,
          },
        },
        isHolidayModeActive: {
          settable: false,
          value: false,
        },
        isInCautionState: {
          settable: false,
          value: false,
        },
        isInErrorState: {
          settable: false,
          value: false,
        },
        isInWarningState: {
          settable: false,
          value: false,
        },
        name: {
          settable: false,
          maxLength: 20,
          value: "DaikinAP77602",
        },
        onOffMode: {
          settable: true,
          values: ["on", "off"],
          value: "on",
        },
        operationMode: {
          settable: true,
          value: "cooling",
          values: ["fanOnly", "heating", "cooling", "auto", "dry"],
        },
        powerfulMode: {
          settable: true,
          values: ["on", "off"],
          value: "off",
        },
        isPowerfulModeActive: {
          settable: false,
          value: false,
        },
        schedule: {
          ref: "#schedule",
          settable: true,
          value: {
            currentMode: {
              value: "any",
              settable: true,
              values: ["any"],
            },
            nextAction: {
              operationMode: "off",
              startTime: "18:00:00",
              actionPeriod: "tuesday",
            },
            modes: {
              any: {
                currentSchedule: {
                  value: "0",
                  settable: true,
                  values: ["0", "1", "2"],
                },
                enabled: {
                  value: true,
                  settable: true,
                },
                meta: {
                  minIntervalBetweenActions: "00:01:00",
                  maxSchedules: 1,
                  maxActionsPerActionPeriod: 6,
                  consecutiveActionsAllowed: true,
                  actionTypes: {
                    operationMode: {
                      settable: false,
                      values: ["fanOnly", "heating", "cooling", "auto", "dry", "off"],
                    },
                    roomTemperature: {
                      heating: {
                        settable: false,
                        stepValue: 0.5,
                        minValue: 10,
                        maxValue: 30,
                      },
                      cooling: {
                        settable: false,
                        stepValue: 0.5,
                        minValue: 18,
                        maxValue: 32,
                      },
                      auto: {
                        settable: false,
                        stepValue: 0.5,
                        minValue: 18,
                        maxValue: 30,
                      },
                    },
                    fanSpeed: {
                      heating: {
                        currentMode: {
                          settable: false,
                          values: ["auto", "quiet", "fixed"],
                        },
                        modes: {
                          fixed: {
                            stepValue: 1,
                            minValue: 1,
                            maxValue: 5,
                            settable: false,
                          },
                        },
                      },
                      cooling: {
                        currentMode: {
                          settable: false,
                          values: ["auto", "quiet", "fixed"],
                        },
                        modes: {
                          fixed: {
                            stepValue: 1,
                            minValue: 1,
                            maxValue: 5,
                            settable: false,
                          },
                        },
                      },
                      auto: {
                        currentMode: {
                          settable: false,
                          values: ["auto", "quiet", "fixed"],
                        },
                        modes: {
                          fixed: {
                            stepValue: 1,
                            minValue: 1,
                            maxValue: 5,
                            settable: false,
                          },
                        },
                      },
                      dry: {
                        currentMode: {
                          settable: false,
                          values: ["auto"],
                        },
                      },
                      fanOnly: {
                        currentMode: {
                          settable: false,
                          values: ["auto", "quiet", "fixed"],
                        },
                        modes: {
                          fixed: {
                            stepValue: 1,
                            minValue: 1,
                            maxValue: 5,
                            settable: false,
                          },
                        },
                      },
                    },
                    econoMode: {
                      settable: false,
                      values: ["on", "off"],
                    },
                  },
                },
                schedules: {
                  "0": {
                    name: {
                      maxLength: 32,
                      settable: true,
                      value: "",
                    },
                    meta: {
                      actionPeriods: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
                      isReadOnly: false,
                    },
                    actions: {
                      monday: {
                        "18:00:00": {
                          operationMode: "off",
                        },
                      },
                      tuesday: {
                        "18:00:00": {
                          operationMode: "off",
                        },
                      },
                      wednesday: {
                        "18:00:00": {
                          operationMode: "off",
                        },
                      },
                      thursday: {
                        "18:00:00": {
                          operationMode: "off",
                        },
                      },
                      friday: {
                        "18:00:00": {
                          operationMode: "off",
                        },
                      },
                      saturday: {
                        "18:00:00": {
                          operationMode: "off",
                        },
                      },
                      sunday: {
                        "18:00:00": {
                          operationMode: "off",
                        },
                      },
                    },
                    settable: true,
                  },
                  "1": {
                    name: {
                      maxLength: 32,
                      settable: true,
                      value: "",
                    },
                    meta: {
                      actionPeriods: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
                      isReadOnly: false,
                    },
                    actions: {},
                    settable: true,
                  },
                  "2": {
                    name: {
                      maxLength: 32,
                      settable: true,
                      value: "",
                    },
                    meta: {
                      actionPeriods: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
                      isReadOnly: false,
                    },
                    actions: {},
                    settable: true,
                  },
                },
              },
            },
          },
        },
        sensoryData: {
          ref: "#sensoryData",
          settable: false,
          value: {
            roomTemperature: {
              settable: false,
              unit: "°C",
              value: 26,
              stepValue: 1,
              minValue: -25,
              maxValue: 48,
            },
            outdoorTemperature: {
              settable: false,
              unit: "°C",
              value: 28,
              stepValue: 0.5,
              minValue: -25,
              maxValue: 50,
            },
          },
        },
        temperatureControl: {
          ref: "#temperatureControl",
          settable: true,
          value: {
            operationModes: {
              heating: {
                setpoints: {
                  roomTemperature: {
                    settable: true,
                    value: 30,
                    unit: "°C",
                    stepValue: 0.5,
                    minValue: 10,
                    maxValue: 30,
                  },
                },
              },
              cooling: {
                setpoints: {
                  roomTemperature: {
                    settable: true,
                    value: 22,
                    unit: "°C",
                    stepValue: 0.5,
                    minValue: 18,
                    maxValue: 32,
                  },
                },
              },
              auto: {
                setpoints: {
                  roomTemperature: {
                    settable: true,
                    value: 25.5,
                    unit: "°C",
                    stepValue: 0.5,
                    minValue: 18,
                    maxValue: 30,
                  },
                },
              },
            },
          },
        },
      },
      {
        embeddedId: "indoorUnit",
        managementPointType: "indoorUnit",
        managementPointCategory: "secondary",
        modelInfo: {
          settable: false,
          value: "FTXM50A2V1B",
        },
        serialNumber: {
          settable: false,
          value: "J100523",
        },
        softwareVersion: {
          settable: false,
          value: "2201B701",
        },
      },
      {
        embeddedId: "outdoorUnit",
        managementPointType: "outdoorUnit",
        managementPointCategory: "secondary",
        modelInfo: {
          settable: false,
          value: "RXM50A5V1B9",
        },
        serialNumber: {
          settable: false,
          value: "T010054",
        },
        errorCode: {
          settable: false,
          value: "00-00",
        },
        isInErrorState: {
          settable: false,
          value: false,
        },
        isInWarningState: {
          settable: false,
          value: false,
        },
        isInCautionState: {
          settable: false,
          value: false,
        },
        softwareVersion: {
          settable: false,
          value: "23007F01",
        },
      },
    ],
    type: "dx4",
    embeddedId: "2501909",
    timestamp: "2025-06-24T14:24:19.065Z",
    id: "702019e1-3aa4-48e5-8d7a-0b8caeee2779",
  },
];
