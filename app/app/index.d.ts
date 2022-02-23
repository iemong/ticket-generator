export {}

type Brand = {
  readonly brand: string
  readonly version: string
}

type NavigatorUAData = {
  readonly brands: Brand[]
  readonly mobile: boolean
  readonly platform: string
}

declare global {
  interface Navigator {
    userAgentData: NavigatorUAData
  }
}
