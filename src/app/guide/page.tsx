'use client';
import React, {useEffect, useState} from 'react';

const GettingStartedPage: React.FC = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
                <h1 className="text-2xl font-semibold mb-4 text-center text-blue-600">Getting Started with Jolt in
                    Java</h1>

                <section className="mt-6">
                    <h2 className="text-xl font-semibold mb-2 text-blue-600">What is Jolt?</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Jolt is a JSON to JSON transformation library designed for Java applications. It allows
                        you to transform JSON data from one format to another using a declarative specification.
                        With Jolt, you can handle complex data transformations without writing custom code for
                        each transformation scenario.
                    </p>

                    <h2 className="text-xl font-semibold mb-2 text-blue-600">When to Use Jolt</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Jolt is particularly useful when you need to:
                    </p>
                    <ul className="list-disc pl-5 mb-4">
                        <li className="text-sm text-gray-600">Transform JSON data between different formats or
                            structures.
                        </li>
                        <li className="text-sm text-gray-600">Simplify the data transformation logic without hardcoding
                            transformations.
                        </li>
                        <li className="text-sm text-gray-600">Maintain a clean and manageable codebase by separating
                            transformation logic from business logic.
                        </li>
                    </ul>

                    <h2 className="text-xl font-semibold mb-2 text-blue-600">Why Use Jolt</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Jolt offers several advantages:
                    </p>
                    <ul className="list-disc pl-5 mb-4">
                        <li className="text-sm text-gray-600">Declarative Specification: Define transformations in a
                            JSON format, making it easy to understand and modify.
                        </li>
                        <li className="text-sm text-gray-600">Reusability: Create reusable transformation specifications
                            that can be applied to different JSON structures.
                        </li>
                        <li className="text-sm text-gray-600">Maintainability: Changes to the transformation logic can
                            be made directly in the specification without altering the Java code.
                        </li>
                    </ul>

                    <h2 className="text-xl font-semibold mb-2 text-blue-600">Best Scenario to Use Jolt</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Jolt is best used in scenarios where:
                    </p>
                    <ul className="list-disc pl-5 mb-4">
                        <li className="text-sm text-gray-600">You need to integrate with APIs or services that return
                            JSON in a different format than your application expects.
                        </li>
                        <li className="text-sm text-gray-600">You want to standardize JSON data formats across different
                            components or systems.
                        </li>
                        <li className="text-sm text-gray-600">You have complex transformation rules that would be
                            cumbersome to implement with manual coding.
                        </li>
                    </ul>

                    <h2 className="text-xl font-semibold mb-2 text-blue-600">Example: Using Jolt with Java</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Here’s a simple example of how to use Jolt in a Java application to transform JSON data:
                    </p>

                    <h3 className="text-lg font-semibold mb-2 text-blue-600">Step 1: Add Jolt Dependency</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Add the Jolt dependency to your `pom.xml` if you’re using Maven:
                    </p>
                    <pre className="bg-gray-800 text-white p-4 rounded-lg mb-4">
                        <code>
{`<dependency>
    <groupId>com.bazaarvoice.jolt</groupId>
    <artifactId>jolt-core</artifactId>
    <version>0.1.2</version>
</dependency>`}
                        </code>
                    </pre>

                    <h3 className="text-lg font-semibold mb-2 text-blue-600">Step 2: Create a Jolt Specification</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Define your transformation specification in a JSON file. For example, `spec.json`:
                    </p>
                    <pre className="bg-gray-800 text-white p-4 rounded-lg mb-4">
                        <code>
{`{
    "operation": "shift",
    "spec": {
        "input": {
            "nested": {
                "field": "outputField"
            }
        }
    }
}`}
                        </code>
                    </pre>

                    <h3 className="text-lg font-semibold mb-2 text-blue-600">Step 3: Implement Transformation in
                        Java</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Use the Jolt library in your Java code to apply the transformation:
                    </p>
                    <pre className="bg-gray-800 text-white p-4 rounded-lg mb-4">
                        <code>
{`import com.bazaarvoice.jolt.Chainr;
import com.bazaarvoice.jolt.Spec;
import com.bazaarvoice.jolt.exception.JoltException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;

public class JoltExample {

    public static void main(String[] args) throws IOException, JoltException {
        // Load Jolt specification
        ObjectMapper mapper = new ObjectMapper();
        JsonNode specNode = mapper.readTree(new File("path/to/spec.json"));
        Chainr chainr = Chainr.fromSpec(specNode);

        // Input JSON
        String inputJson = "{ \"input\": { \"nested\": { \"field\": \"value\" } } }";
        JsonNode inputNode = mapper.readTree(inputJson);

        // Transform JSON
        JsonNode outputNode = chainr.transform(inputNode);
        System.out.println(outputNode.toString());
    }
}`}
                        </code>
                    </pre>

                    <h2 className="text-xl font-semibold mb-2 text-blue-600">Additional Resources</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        For more information and advanced usage of Jolt, refer to the official documentation and
                        community resources.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default GettingStartedPage;
