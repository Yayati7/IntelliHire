def print_pipeline(debug):

    print("\n" + "=" * 80)
    print("               INTELLIHIRE AI PIPELINE")
    print("=" * 80)

    print(f"\nMODEL : {debug.modelName}")
    print(f"Embedding Dimension : {debug.embeddingDimension}")

    print("\n" + "-" * 80)
    print("ORIGINAL RESUME")
    print("-" * 80)
    print(debug.originalResume)

    print("\n" + "-" * 80)
    print("CLEANED RESUME")
    print("-" * 80)
    print(debug.cleanedResume)

    print("\nResume Skills:")
    print(", ".join(debug.extractedResumeSkills))

    print("\nJobs Evaluated:", debug.totalJobsEvaluated)

    for job in debug.evaluatedJobs:

        print("\n" + "=" * 80)
        print(job.jobTitle)
        print("=" * 80)

        print("Matched Skills :", job.matchedSkills)
        print("Missing Skills :", job.missingSkills)

        print()

        print("Semantic Score :", job.semanticSimilarity)
        print("Skill Score    :", job.skillMatchScore)
        print("ML Score       :", job.mlPredictionScore)

        print()

        print("Final Hybrid Score :",
              job.scoreBreakdown.finalHybridScore)

        print()

        print("Explanation:")
        print(job.explanation)

    print("\n" + "=" * 80)