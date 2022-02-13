import { useEthers } from "@usedapp/core"
import helperConfig from "../helper-config.json"
import networkMapping from "../chain-info/deployments/map.json"
import { constants } from "ethers"
import brownieConfig from "../brownie-config.json"
import ph from "../ph.png"
import dai from "../dai.png"
import eth from "../eth.png"
import { YourWallet } from "./yourWallet"
import { makeStyles } from "@material-ui/core"

export type Token = {
    image: string
    address: string
    name: string
}

const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.palette.common.white,
        textAlign: "center",
        padding: theme.spacing(4)
    }
}))

export const Main = () => {
    // Show token values from wallet
    // Get the address of different tokens
    // Get the balance of the users wallet

    // send the brownie-config to our 'src' folder
    // send the build folder
    const classes = useStyles()
    const {chainId} = useEthers()
    const networkName = chainId ? helperConfig[chainId] : "dev"

    const phTokenAddress = chainId ? networkMapping[String(chainId)]["PHToken"][0] : constants.AddressZero
    const wethTokenAddress = chainId ? brownieConfig["networks"][networkName]["weth_token"] : constants.AddressZero
    const fauTokenAddress = chainId ? brownieConfig["networks"][networkName]["fau_token"] : constants.AddressZero

    const supportedTokens: Array<Token> = [
        {
            image: ph,
            address: phTokenAddress,
            name: "PH"
        },
        {
            image: eth,
            address: wethTokenAddress,
            name: "WETH"
        },
        {
            image: dai,
            address: fauTokenAddress,
            name: "DAI"
        }
    ]

    return(<>
    <h2 className={classes.title}>Dapp Token Farm App</h2>
    <YourWallet supportedTokens={supportedTokens}/>
    </>
    )
}