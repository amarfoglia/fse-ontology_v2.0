import { Component, JSXElement } from "solid-js"
import useVpsStore from "../../hooks/useVpsStore"
import { ClinicalDocument } from "../../models/ClinicalDocument"
import { Discharge, ModeOfTransport, ReasonForVisit, Triage } from "../../models/Section"
import { formatDate } from "../../utils/helpers"
import CardBox from "../CardBox"
import FallbackWrapper from "../FallBackWrapper"


const DischargeInfo: Component<{ discharge: Discharge }> = (props) => (
  <div class="flex flex-wrap gap-4 text-sm text-gray-400">
    {<p><i class="mdi mdi-hospital-building mr-2"></i>{props.discharge.transfer}</p>}
    {<p><i class="mdi mdi-checkbox-multiple-blank-circle-outline mr-2"></i>{props.discharge.statusCode}</p>}
    {<p><i class="mdi mdi-account-multiple mr-2"></i>{`${props.discharge.performer.name} ${props.discharge.performer.surname}`}</p>}
    <p><i class="mdi mdi-calendar mr-2"></i>{formatDate(props.discharge.effectiveTime)}</p>
  </div>
)

const ReasonInfo: Component<{ reason: ReasonForVisit }> = ({ reason: reason }) => (
  <div class="flex flex-wrap gap-4 text-sm text-gray-400">
    {<p><i class="mdi mdi-checkbox-multiple-blank-circle-outline mr-2"></i>{reason.mainProblem.statusCode}</p>}
    {<p><i class="mdi mdi-svg mr-2"></i>{reason.mainProblem.symptom}</p>}
  </div>
)

const TransportInfo: Component<{ transport: ModeOfTransport }> = ({ transport }) => (
  <div class="flex flex-wrap gap-4 text-sm text-gray-400">
    {<p><i class="mdi mdi-account-multiple mr-2"></i>{`${transport.missionManager.name} ${transport.missionManager.surname}`}</p>}
    {<p><i class="mdi mdi-car-side mr-2"></i>{transport.vehicle}</p>}
  </div>
)

const TriageInfo: Component<{ triage: Triage }> = ({ triage }) => (
  <div class="flex flex-wrap gap-4 text-sm text-gray-400">
    {<p><i class="mdi mdi-checkbox-multiple-blank-circle-outline mr-2"></i>{triage.statusCode}</p>}
    {<p><i class="mdi mdi-account-multiple mr-2"></i>{`${triage.performer.name} ${triage.performer.surname}`}</p>}
    <p><i class="mdi mdi-calendar mr-2"></i>{formatDate(triage.effectiveTime)}</p>
  </div>
)

interface Props {
  document: ClinicalDocument
}

const VPS: Component<Props> = (props) => {
  const { discharge, modeOfTrasport, reasonForVisit, triage } = useVpsStore(props.document.id)

  const renderDischarge = (dis: Discharge): JSXElement => (
    <CardBox title={dis.title} body={dis.body} iconName="transit-transfer" children={<DischargeInfo discharge={dis} />}/>
  )

  const renderReasonForVisit = (reason: ReasonForVisit): JSXElement => (
    <CardBox title={reason.title} body={reason.body} iconName="hospital" children={<ReasonInfo reason={reason} />}/>
  )

  const renderTransport = (transport: ModeOfTransport): JSXElement => (
    <CardBox title={transport.title} body={transport.body} iconName="ambulance" children={<TransportInfo transport={transport} />}/>
  )

  const renderTriage = (triage: Triage): JSXElement => (
    <CardBox title={triage.title} body={triage.body} iconName="call-split" children={<TriageInfo triage={triage} />}/>
  )

  return (
    <>
    <FallbackWrapper
        reasonForEmpty="Nessuna informazione."
        renderContent={() => renderReasonForVisit(reasonForVisit())}
        title="Verbale di Pronto Soccorso"
        error={reasonForVisit?.error}
        loading={reasonForVisit?.loading}
        empty={reasonForVisit() == null} />

    <FallbackWrapper
        reasonForEmpty="Nessuna informazione."
        renderContent={() => renderTransport(modeOfTrasport())}
        error={modeOfTrasport?.error}
        loading={modeOfTrasport?.loading}
        empty={modeOfTrasport() == null} />

    <FallbackWrapper
        reasonForEmpty="Nessuna informazione."
        renderContent={() => renderTriage(triage())}
        error={triage?.error}
        loading={triage?.loading}
        empty={triage() == null} />

    <FallbackWrapper
        reasonForEmpty="Nessuna informazione."
        renderContent={() => renderDischarge(discharge())}
        error={discharge?.error}
        loading={discharge?.loading}
        empty={discharge() == null} />
    </>
  )
}

export default VPS