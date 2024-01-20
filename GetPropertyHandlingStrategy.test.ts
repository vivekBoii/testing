import { GetPropertyHandlingStrategy } from '../../../../../src/logic/events/controller/impl/GetPropertyHandlingStrategy';
import { Queue } from '../../../../../src/data_structure/Ds_queue';
const createMockNode = (props: any = {}) => ({
    ...props,
});
describe('GetPropertyHandlingStrategy', () => {

    //***************/ Test case to check Extractpropertiesrecursively/***************//
    it('should extract properties recursively for a single node', () => {
        const strategy = new GetPropertyHandlingStrategy();
        const queue = new Queue<string>();
        const set = new Set<string>();
        const level = 0;
        const node = createMockNode({ id: 'node1', name: 'Node 1', reactions: [], children: [] });
        const extractedData = strategy['extractPropertiesRecursively'](node, queue, set, level);
        expect(extractedData).toEqual({
            id: 'node1',
            name: 'Node 1',
            reactions: [],
            children: [],
            isSelected: true
        });
        expect(queue.size()).toBe(0),
            expect(level).toBe(0);

    });




    //***************/ Test case to check Extractpropertiesrecursively - getStyledTextSegments/***************//

//     it('should extract properties recursively for a single node containing prop getStyledTextSegments', () => {
//     const strategy = new GetPropertyHandlingStrategy();
//     const queue = new Queue<string>();
//     const set = new Set<string>();
//     const node = createMockNode({
//         id: "node",
//         name: "Node",
//         type: 'TEXT',
//         getStyledTextSegments: (props) => {
//             return [{ ...props }];
//         },
//     });

//     const level = 0;
//     const extractedData = strategy['extractPropertiesRecursively'](node, queue, set, level);
//     const expectedData = {
//         id: 'node',
//         name: 'Node',
//         type: 'TEXT',
//         isSelected: true,
//         getStyledTextSegments: [
//             {
//                 end: true,
//                 start: true,
//                 fontSize: true,
//                 fontName: true,
//                 fontWeight: true,
//                 textDecoration: true,
//                 textCase: true,
//                 lineHeight: true,
//                 letterSpacing: true,
//                 fills: true,
//                 textStyleId: true,
//                 fillStyleId: true,
//                 listOptions: true,
//                 indentation: true,
//                 hyperlink: true,
//             },
//         ],
//     };

//     console.log('expectedData - ' + JSON.stringify(expectedData));
//     console.log('extractedData - ' + JSON.stringify(extractedData));
    
    
//     expect(extractedData).toEqual(expectedData);
//     expect(queue.size()).toBe(0);
//     expect([...set]).toStrictEqual([]);
// });






    // test case containing symbol props
    // it('should extract properties recursively for a single node with nested children containing symbol type', () => {
    //     const strategy = new GetPropertyHandlingStrategy();
    //     const symbolProp = Symbol('figma.mixed');
    //     const queue = new Queue<string>();
    //     const set = new Set<string>();
    //     const node = createMockNode({ id: "node", name: "Node", children: [], open: symbolProp });
    //     const node2 = createMockNode({ id: "node2", name: "Node2", children: [node], open: symbolProp });
    //     const parent = createMockNode({ id: "parent", name: "Parent", children: [node, node2], open: symbolProp })
    //     const extractedData = strategy['extractPropertiesRecursively'](parent, queue, set);
    //     expect(extractedData).toEqual({

    //         id: 'parent',
    //         name: 'Parent',
    //         children: [

    //             {
    //                 id: 'node',
    //                 name: 'Node',
    //                 children: [],
    //                 open: 'symbol-figma.mixed'
    //             }, {
    //                 id: 'node2',
    //                 name: 'Node2',
    //                 children: [
    //                     {
    //                         id: 'node',
    //                         name: 'Node',
    //                         children: [],
    //                         open: 'symbol-figma.mixed'
    //                     }
    //                 ],
    //                 open: 'symbol-figma.mixed'
    //             }
    //         ],
    //         open: 'symbol-figma.mixed'

    //     });
    //     expect(queue.size()).toBe(0);
    //     expect([...set]).toStrictEqual([]);
    // });

    // it('should extract properties recursively for a single node containing main and master node ', () => {
    //     const strategy = new GetPropertyHandlingStrategy();
    //     const symbolProp = Symbol('figma.mixed');
    //     const node = createMockNode({ id: "node", name: "Node", children: [], open: symbolProp, maincomponent: { type: "maincomponent" }, mastercomponent: { type: "mastercomponent" }, componentPropertyDefinitions: { type: "function" }, parent: { type: "parent" } });
    //     const queue = new Queue<string>();
    //     const set = new Set<string>();
    //     const parent = createMockNode({ id: "parent", name: "Parent", children: [node], open: symbolProp, maincomponent: {}, mastercomponent: {}, componentPropertyDefinitions: {}, parent: {} })

    //     const extractedData = strategy['extractPropertiesRecursively'](parent, queue, set);

    //     expect(extractedData).toEqual({

    //         id: 'parent',
    //         name: 'Parent',
    //         maincomponent: {},
    //         mastercomponent: {},
    //         children: [
    //             {
    //                 id: 'node',
    //                 name: 'Node',
    //                 children: [],
    //                 open: 'symbol-figma.mixed',
    //                 maincomponent: { type: "maincomponent" },
    //                 mastercomponent: { type: "mastercomponent" },
    //             }
    //         ],
    //         open: 'symbol-figma.mixed'
    //     });
    //     expect(queue.size()).toBe(0);
    //     expect([...set]).toStrictEqual([]);
    // });
    // it('should extract properties recursively for a single node containing reactions', () => {
    //     const strategy = new GetPropertyHandlingStrategy();
    //     const queue = new Queue<string>();
    //     const set = new Set<string>();
    //     const node = createMockNode({
    //         id: 'node1', name: 'Node 1', reactions: [
    //             { action: { destinationId: 'nextnode', type: 'framenode' } }], children: []
    //     });
    //     const extractedData = strategy['extractPropertiesRecursively'](node, queue, set);

    //     expect(extractedData).toEqual({
    //         id: 'node1',
    //         name: 'Node 1',
    //         reactions: [
    //             {
    //                 action:
    //                 {
    //                     destinationId: 'nextnode',
    //                     type: 'framenode'
    //                 }
    //             }
    //         ],
    //         children: [],
    //     });
    //     expect(queue.size()).toBe(1);
    //     expect([...set]).toStrictEqual(["nextnode"]);

    // });
    // it('should extract properties recursively for a single node containing multiple  reactions', () => {
    //     const strategy = new GetPropertyHandlingStrategy();
    //     const queue = new Queue<string>();
    //     const set = new Set<string>();
    //     const node = createMockNode({
    //         id: 'node1', name: 'Node 1', reactions: [
    //             { action: { destinationId: 'first', type: 'firstNode' } }, { action: { destinationId: 'second', type: 'secondNode' } }], children: []
    //     });
    //     const extractedData = strategy['extractPropertiesRecursively'](node, queue, set);

    //     expect(extractedData).toEqual({
    //         id: 'node1',
    //         name: 'Node 1',
    //         reactions: [
    //             {
    //                 action:
    //                 {
    //                     destinationId: 'first',
    //                     type: 'firstNode'
    //                 }
    //             }, {
    //                 action:
    //                 {
    //                     destinationId: 'second',
    //                     type: 'secondNode'
    //                 }
    //             }
    //         ],
    //         children: [],
    //     });
    //     expect(queue.size()).toBe(2);
    //     expect([...set]).toStrictEqual(["first", "second"]);

    // });

    //***************/ Test case to check Extract Properties/***************/ //

    // it('should extract properties of single node using extractProps', () => {
    //     // Create a mock node with various properties
    //     const mockNode = {
    //         id: 'node1',
    //         name: 'Node 1',
    //         parent: 'parent value', // Excluded property
    //         mainComponent: 'main component value', // Excluded property
    //         masterComponent: 'master component value', // Excluded property
    //         componentPropertyDefinitions: 'component property definitions value', // Excluded property
    //         otherProperty1: 'value 1',
    //         otherProperty2: 'value 2',
    //         // Add more properties as needed for your specific case
    //     };

    //     // Create an instance of GetPropertyHandlingStrategy
    //     const strategy = new GetPropertyHandlingStrategy();

    //     // Call the extractProps function with the mock node
    //     const result = strategy['extractProps'](mockNode);

    //     // Assert that the result contains only the properties that are not excluded
    //     expect(result).toEqual({
    //         id: 'node1',
    //         name: 'Node 1',
    //         otherProperty1: 'value 1',
    //         otherProperty2: 'value 2'
    //     });
    // });
    // it('should extract properties using function extractProps with null values', () => {


    //     // Create an instance of GetPropertyHandlingStrategy
    //     const strategy = new GetPropertyHandlingStrategy();

    //     // Call the extractProps function with the mock node
    //     const result = strategy['extractProps'](null);

    //     // Assert that the result contains only the properties that are not excluded
    //     expect(result).toEqual({

    //     });
    // });
});

