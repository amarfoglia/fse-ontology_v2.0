import { Component, For, JSXElement } from "solid-js"
import useRsaStore from "../../hooks/useRsaStore"
import { ClinicalDocument } from "../../models/ClinicalDocument"
import { OsReport, Service } from "../../models/Section"
import CardBox from "../CardBox"
import FallbackWrapper from "../FallBackWrapper"

const OsReportInfo: Component<{ osReport: OsReport }> = ({ osReport }) => (
  <></>
)

const ServiceInfo: Component<{ service: Service }> = ({ service }) => (
  <For each={service.procedures}>{ procedure =>
    <div class="flex flex-wrap gap-4 text-sm text-gray-400">
      {<p><i class="mdi mdi-gesture-double-tap mr-2"></i>{procedure.name}</p>}
    </div>
  }</For>
)

interface Props {
  document: ClinicalDocument
}

const VPS: Component<Props> = (props) => {
  const { osReport, services } = useRsaStore(props.document.id)

  const renderOsReport = (osR: OsReport): JSXElement => (
    <CardBox title={osR.title} body={osR.body} iconName="content-copy" children={<OsReportInfo osReport={osR} />}/>
  )

  const renderServices = (services: Service[]): JSXElement => {
    let servicesNum = 1
    return (
      <For each={services}>{ service =>
        <CardBox title={`Prestazione #${servicesNum++}`} body={service.body} iconName="hexagon-multiple" children={<ServiceInfo service={service} />}/>
      }
      </For>
    )
  }


  return (
    <>
    <FallbackWrapper
        reasonForEmpty="Nessuna informazione."
        renderContent={() => renderOsReport(osReport())}
        title="Referto di Specialistica Ambulatoriale"
        error={osReport?.error}
        loading={osReport?.loading}
        empty={osReport() == null} />

    <FallbackWrapper
        reasonForEmpty="Nessuna informazione."
        renderContent={() => renderServices(services())}
        title="Prestazioni"
        error={services?.error}
        loading={services?.loading}
        empty={services() == null} />
    </>
  )
}

export default VPS