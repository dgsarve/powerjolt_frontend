'use client';
import React, { useEffect, useState } from 'react';

const ArchitecturePage: React.FC = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full">
                <h1 className="text-3xl font-semibold mb-4 text-center text-blue-600">Jolt Transformation Architecture</h1>
                <h2 className="text-2xl font-semibold mb-4 text-blue-600">Overview</h2>
                <p className="text-sm text-gray-600 mb-4">
                    This document describes the architecture for a Jolt transformation system. The system takes input JSON payloads from a source system (e.g., Magento) and transforms them using Jolt specifications before sending them to various destination systems (e.g., SAP, Salesforce, Oracle ERP, Microsoft Dynamics 365, NetSuite).
                </p>
                <h2 className="text-2xl font-semibold mb-4 text-blue-600">Architecture Diagram</h2>
                <img src="joltarchitecture.png" alt="Architecture Diagram" className="mb-6 mx-auto" />
                <h2 className="text-2xl font-semibold mb-4 text-blue-600">Components</h2>

                <h3 className="text-xl font-semibold mb-2 text-blue-600">Spring Boot Application</h3>
                <p className="text-sm text-gray-600 mb-4">
                    The Spring Boot application consists of a controller, a service layer, Feign clients with retries for each destination system, saving failed records to the database, and a scheduler for retrying failed transformations.
                </p>

                <h3 className="text-xl font-semibold mb-2 text-blue-600">Controller</h3>
                <pre className="bg-gray-800 text-white p-4 rounded-lg mb-4 overflow-x-auto">
                    {`@RestController
@RequestMapping("/api")
public class TransformationController {
    @Autowired
    private TransformationService transformationService;

    @PostMapping("/transform")
    public ResponseEntity<String> transformAndSend(
            @RequestBody Map<String, Object> input,
            @RequestParam String sourceSystemId,
            @RequestParam String destinationSystemId) {
        String response = transformationService.transformAndSend(input, sourceSystemId, destinationSystemId);
        return ResponseEntity.ok(response);
    }
}`}
                </pre>

                <h3 className="text-xl font-semibold mb-2 text-blue-600">Service Layer</h3>
                <pre className="bg-gray-800 text-white p-4 rounded-lg mb-4 overflow-x-auto">
                    {`@Service
public class TransformationService {
    @Autowired
    private JoltSpecRepository joltSpecRepository;
    @Autowired
    private FailedRecordRepository failedRecordRepository;
    @Autowired
    private SAPClient sapClient;
    @Autowired
    private SalesforceClient salesforceClient;
    @Autowired
    private OracleClient oracleClient;
    @Autowired
    private MSDynamicsClient msDynamicsClient;
    @Autowired
    private NetSuiteClient netSuiteClient;

    public String transformAndSend(Map<String, Object> input, String sourceSystemId, String destinationSystemId) {
        String joltSpec = joltSpecRepository.getJoltSpec(sourceSystemId, destinationSystemId);
        Map<String, Object> transformedOutput = applyJoltTransformation(input, joltSpec);

        try {
            switch(destinationSystemId) {
                case "SAP": return sapClient.sendData(transformedOutput);
                case "Salesforce": return salesforceClient.sendData(transformedOutput);
                case "Oracle": return oracleClient.sendData(transformedOutput);
                case "MSDynamics": return msDynamicsClient.sendData(transformedOutput);
                case "NetSuite": return netSuiteClient.sendData(transformedOutput);
                default: throw new IllegalArgumentException("Unknown destination system: " + destinationSystemId);
            }
        } catch (Exception e) {
            FailedRecord failedRecord = new FailedRecord(sourceSystemId, destinationSystemId, input);
            failedRecordRepository.save(failedRecord);
            throw e;
        }
    }

    private Map<String, Object> applyJoltTransformation(Map<String, Object> input, String joltSpec) {
        Chainr chainr = Chainr.fromSpec(JsonUtils.jsonToList(joltSpec));
        Object transformedOutput = chainr.transform(input);
        return (Map<String, Object>) transformedOutput;
    }
}`}
                </pre>

                <h3 className="text-xl font-semibold mb-2 text-blue-600">Feign Clients with Retry</h3>
                <pre className="bg-gray-800 text-white p-4 rounded-lg mb-4 overflow-x-auto">
                    {`@FeignClient(name = "sapClient", url = "http://sap-system.com/api", configuration = FeignConfig.class)
public interface SAPClient {
    @PostMapping("/data")
    String sendData(@RequestBody Map<String, Object> data);
}

@FeignClient(name = "salesforceClient", url = "http://salesforce-system.com/api", configuration = FeignConfig.class)
public interface SalesforceClient {
    @PostMapping("/data")
    String sendData(@RequestBody Map<String, Object> data);
}

@FeignClient(name = "oracleClient", url = "http://oracle-erp-system.com/api", configuration = FeignConfig.class)
public interface OracleClient {
    @PostMapping("/data")
    String sendData(@RequestBody Map<String, Object> data);
}

@FeignClient(name = "msDynamicsClient", url = "http://ms-dynamics-system.com/api", configuration = FeignConfig.class)
public interface MSDynamicsClient {
    @PostMapping("/data")
    String sendData(@RequestBody Map<String, Object> data);
}

@FeignClient(name = "netSuiteClient", url = "http://netsuite-system.com/api", configuration = FeignConfig.class)
public interface NetSuiteClient {
    @PostMapping("/data")
    String sendData(@RequestBody Map<String, Object> data);
}`}
                </pre>

                <h3 className="text-xl font-semibold mb-2 text-blue-600">Feign Configuration</h3>
                <pre className="bg-gray-800 text-white p-4 rounded-lg mb-4 overflow-x-auto">
                    {`@Configuration
public class FeignConfig {
    @Bean
    public Retryer retryer() {
        return new Retryer.Default(1000, 2000, 3);
    }
}`}
                </pre>

                <h3 className="text-xl font-semibold mb-2 text-blue-600">Failed Record Repository</h3>
                <pre className="bg-gray-800 text-white p-4 rounded-lg mb-4 overflow-x-auto">
                    {`@Entity
public class FailedRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String sourceSystemId;
    private String destinationSystemId;
    private String inputJson;

    // Constructors, getters, and setters
}

@Repository
public interface FailedRecordRepository extends JpaRepository<FailedRecord, Long> {
}
`}
                </pre>

                <h3 className="text-xl font-semibold mb-2 text-blue-600">Scheduler for Retrying Failed Transformations</h3>
                <pre className="bg-gray-800 text-white p-4 rounded-lg mb-4 overflow-x-auto">
                    {`@Service
public class RetryService {
    @Autowired
    private FailedRecordRepository failedRecordRepository;
    @Autowired
    private TransformationService transformationService;

    @Scheduled(fixedDelayString = "\${retry.fixedDelay}")
    public void retryFailedRecords() {
        List<FailedRecord> failedRecords = failedRecordRepository.findAll();
        for (FailedRecord record : failedRecords) {
            try {
                Map<String, Object> input = new ObjectMapper().readValue(record.getInputJson(), Map.class);
                transformationService.transformAndSend(input, record.getSourceSystemId(), record.getDestinationSystemId());
                failedRecordRepository.delete(record);
            } catch (Exception e) {
                // Log and continue with next record
            }
        }
    }
}
`}
                </pre>

                <h3 className="text-xl font-semibold mb-2 text-blue-600">Application.yml Configuration</h3>
                <pre className="bg-gray-800 text-white p-4 rounded-lg mb-4 overflow-x-auto">
                    {`jolt:
  specs:
    default: "[{\"operation\":\"shift\",\"spec\":{\"*\":\"&\"}}]"
    Magento_SAP: "[{"operation":"shift","spec":{"id":"product_id","sku":"sku","name":"name","price":"price","status":"status","visibility":"visibility","type_id":"type","weight":"weight","created_at":"created_at","updated_at":"updated_at","extension_attributes":{"stock_item":{"qty":"stock_qty","is_in_stock":"in_stock"}},"custom_attributes":{"*":{"attribute_code":"attribute_code","value":"value","@(2,attribute_code)":{"description":"description","color":"color","category_ids":"category_ids","options_container":"options_container","required_options":"required_options","has_options":"has_options","url_key":"url_key","tax_class_id":"tax_class_id","material":"material","size":"size","pattern":"pattern"}}}}}]"
    Magento_Salesforce: "[{"operation":"shift","spec":{"id":"product.id","sku":"product.sku","name":"product.name","price":"product.price","status":"product.status","visibility":"product.visibility","type_id":"product.type","created_at":"product.created_at","updated_at":"product.updated_at","weight":"product.weight","extension_attributes":{"stock_item":{"qty":"stock.qty","is_in_stock":"stock.is_in_stock"}},"custom_attributes":{"*":{"attribute_code":{"description":"attributes.description","color":"attributes.color","category_ids":"attributes.category_ids","options_container":"attributes.options_container","required_options":"attributes.required_options","has_options":"attributes.has_options","url_key":"attributes.url_key","tax_class_id":"attributes.tax_class_id","material":"attributes.material","size":"attributes.size","pattern":"attributes.pattern"}}}}}]"
    Magento_Oracle: "[{"operation":"shift","spec":{"id":"product.id","sku":"product.sku","name":"product.name","price":"product.price","status":"product.status","visibility":"product.visibility","type_id":"product.type","weight":"product.weight","created_at":"product.created_at","updated_at":"product.updated_at","custom_attributes":{"*":{"attribute_code":{"category_ids":{"@(2,value)":{"*":{"@(1,attribute_code)":{"category_ids":{"@(1,value)":"categories[&1]"}}}}}}}},"extension_attributes":{"stock_item":{"qty":"stock_qty","is_in_stock":"stock_in_stock"}}}}]"
    Magento_MSDynamics: "[{"operation":"shift","spec":{"id":"product_id","sku":"sku","name":"name","price":"price","status":"status","visibility":"visibility","weight":"weight","extension_attributes":{"website_ids":"website_ids","category_links":{"*":{"category_id":{"@(2,category_id)":"category_ids[&1]"}}},"stock_item":{"qty":"stock_qty","is_in_stock":"in_stock"}},"custom_attributes":{"*":{"attribute_code":{"description":"description","color":"color","size":"size"},"value":{"@(2,attribute_code)":"attributes[&1].value"}}}}}]"
    Magento_NetSuite: "[{"operation":"shift","spec":{"id":"product.details.id","sku":"product.details.sku","name":"product.details.name","price":"product.details.price","weight":"product.details.weight","extension_attributes":{"website_ids":"product.extension.website_ids","category_links":{"*":{"category_id":{"@(2,category_id)":"product.extension.categories[&1]"}}},"stock_item":{"qty":"product.extension.stock.qty","is_in_stock":"product.extension.stock.in_stock"}},"custom_attributes":{"*":{"attribute_code":{"description":"product.attributes.description","color":"product.attributes.color","size":"product.attributes.size"},"value":{"@(2,attribute_code)":"product.attributes[&1]"}}}}}]"

retry:
  fixedDelay: 60000
`}
                </pre>

                <h2 className="text-2xl font-semibold mb-4 text-blue-600">Sample Magento Product Json</h2>

                <div className="relative overflow-x-auto">
                    <pre className="bg-gray-800 text-white p-4 rounded-lg mb-4 overflow-x-auto">
{'{\n' +
    '  "id": 2079,\n' +
    '  "sku": "MS-Dime-S",\n' +
    '  "name": "Dime Tee Small",\n' +
    '  "attribute_set_id": 9,\n' +
    '  "price": 25,\n' +
    '  "status": 1,\n' +
    '  "visibility": 1,\n' +
    '  "type_id": "simple",\n' +
    '  "created_at": "2017-11-29 20:40:07",\n' +
    '  "updated_at": "2017-11-29 20:40:07",\n' +
    '  "weight": 0.6,\n' +
    '  "extension_attributes": {\n' +
    '    "website_ids": [\n' +
    '      1\n' +
    '    ],\n' +
    '    "category_links": [\n' +
    '      {\n' +
    '        "position": 0,\n' +
    '        "category_id": "11"\n' +
    '      },\n' +
    '      {\n' +
    '        "position": 1,\n' +
    '        "category_id": "12"\n' +
    '      },\n' +
    '      {\n' +
    '        "position": 2,\n' +
    '        "category_id": "16"\n' +
    '      }\n' +
    '    ],\n' +
    '    "stock_item": {\n' +
    '      "item_id": 2079,\n' +
    '      "product_id": 2079,\n' +
    '      "stock_id": 1,\n' +
    '      "qty": 10,\n' +
    '      "is_in_stock": true,\n' +
    '      "is_qty_decimal": false,\n' +
    '      "show_default_notification_message": false,\n' +
    '      "use_config_min_qty": true,\n' +
    '      "min_qty": 0,\n' +
    '      "use_config_min_sale_qty": 1,\n' +
    '      "min_sale_qty": 1,\n' +
    '      "use_config_max_sale_qty": true,\n' +
    '      "max_sale_qty": 10000,\n' +
    '      "use_config_backorders": true,\n' +
    '      "backorders": 0,\n' +
    '      "use_config_notify_stock_qty": true,\n' +
    '      "notify_stock_qty": 1,\n' +
    '      "use_config_qty_increments": true,\n' +
    '      "qty_increments": 0,\n' +
    '      "use_config_enable_qty_inc": true,\n' +
    '      "enable_qty_increments": false,\n' +
    '      "use_config_manage_stock": true,\n' +
    '      "manage_stock": true,\n' +
    '      "low_stock_date": null,\n' +
    '      "is_decimal_divided": false,\n' +
    '      "stock_status_changed_auto": 0\n' +
    '    }\n' +
    '  },\n' +
    '  "product_links": [],\n' +
    '  "options": [],\n' +
    '  "media_gallery_entries": [],\n' +
    '  "tier_prices": [],\n' +
    '  "custom_attributes": [\n' +
    '    {\n' +
    '      "attribute_code": "description",\n' +
    '      "value": "The Dime Tee is soft, comfortable and durable. You will love the way you look in this tailored tee shirt."\n' +
    '    },\n' +
    '    {\n' +
    '      "attribute_code": "color",\n' +
    '      "value": "52"\n' +
    '    },\n' +
    '    {\n' +
    '      "attribute_code": "category_ids",\n' +
    '      "value": [\n' +
    '        "11",\n' +
    '        "12",\n' +
    '        "16"\n' +
    '      ]\n' +
    '    },\n' +
    '    {\n' +
    '      "attribute_code": "options_container",\n' +
    '      "value": "container2"\n' +
    '    },\n' +
    '    {\n' +
    '      "attribute_code": "required_options",\n' +
    '      "value": "0"\n' +
    '    },\n' +
    '    {\n' +
    '      "attribute_code": "has_options",\n' +
    '      "value": "0"\n' +
    '    },\n' +
    '    {\n' +
    '      "attribute_code": "url_key",\n' +
    '      "value": "champ-tee-small"\n' +
    '    },\n' +
    '    {\n' +
    '      "attribute_code": "tax_class_id",\n' +
    '      "value": "2"\n' +
    '    },\n' +
    '    {\n' +
    '      "attribute_code": "material",\n' +
    '      "value": "148"\n' +
    '    },\n' +
    '    {\n' +
    '      "attribute_code": "size",\n' +
    '      "value": "168"\n' +
    '    },\n' +
    '    {\n' +
    '      "attribute_code": "pattern",\n' +
    '      "value": "196"\n' +
    '    }\n' +
    '  ]\n' +
    '}'}

                    </pre>
                </div>
            </div>
        </div>
    );
};

export default ArchitecturePage;
